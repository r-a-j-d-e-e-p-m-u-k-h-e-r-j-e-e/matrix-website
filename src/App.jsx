import React, { useEffect, useMemo, useState } from "react";
import { BRANDS, DEFAULT_BRAND_KEY } from "./data/brands";
import { PRODUCTS } from "./data/products";
import { TRANSLATIONS } from "./data/translations";
import { GROUP_LOCATIONS } from "./data/group";
import useLocalStorage from "./hooks/useLocalStorage";
import HouseGateway from "./components/gateway/HouseGateway";
import GroupHome from "./components/group/GroupHome";
import MatrixListing from "./components/listings/MatrixListing";
import ClubListing from "./components/listings/ClubListing";
import AlwaysWellListing from "./components/listings/AlwaysWellListing";
import ProductPage from "./components/product/ProductPage";
import ContactModal from "./components/modals/ContactModal";
import SearchModal from "./components/modals/SearchModal";
import AiConciergeModal from "./components/modals/AiConciergeModal";
import AppointmentModal from "./components/modals/AppointmentModal";
import SelectionDrawer from "./components/drawers/SelectionDrawer";
import BrandFilterBar from "./components/filters/BrandFilterBar";
import BrandIntro from "./components/sections/BrandIntro";
import BrandHighlights from "./components/sections/BrandHighlights";
import BrandFooter from "./components/sections/BrandFooter";
import GlobalActions from "./components/navigation/GlobalActions";
import AnnouncementBar from "./components/navigation/AnnouncementBar";

const DEFAULT_FILTERS = {
  category: "All",
  availability: "All",
  tier: "All"
};

export default function App() {
  const [activeBrand, setActiveBrand] = useState(DEFAULT_BRAND_KEY);
  const [view, setView] = useState("group");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [contactProduct, setContactProduct] = useState(null);
  const [showGateway, setShowGateway] = useState(false);
  const [modals, setModals] = useState({
    contact: false,
    search: false,
    ai: false,
    selection: false,
    appointment: false
  });
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState("featured");

  const [lang, setLang] = useLocalStorage("matrix_lang", "en");
  const [currency, setCurrency] = useLocalStorage("matrix_currency", "INR");
  const [savedIds, setSavedIds] = useLocalStorage("matrix_selection", []);

  const t = useMemo(() => {
    return {
      ...TRANSLATIONS.en,
      ...(TRANSLATIONS[lang] || {})
    };
  }, [lang]);

  const brandKey = BRANDS[activeBrand] ? activeBrand : DEFAULT_BRAND_KEY;
  const config = BRANDS[brandKey];

  const brandProducts = useMemo(() => {
    return PRODUCTS.filter((product) => product.brand === config.id);
  }, [config.id]);

  const filterOptions = useMemo(() => {
    const categories = ["All", ...new Set(brandProducts.map((p) => p.category))];
    const availability = [
      "All",
      ...new Set(brandProducts.map((p) => p.availability))
    ];
    const tiers = ["All", ...new Set(brandProducts.map((p) => p.tier))];
    return { categories, availability, tiers };
  }, [brandProducts]);

  const filteredProducts = useMemo(() => {
    let items = [...brandProducts];
    if (filters.category !== "All") {
      items = items.filter((product) => product.category === filters.category);
    }
    if (filters.availability !== "All") {
      items = items.filter(
        (product) => product.availability === filters.availability
      );
    }
    if (filters.tier !== "All") {
      items = items.filter((product) => product.tier === filters.tier);
    }

    switch (sortBy) {
      case "new":
        items.sort((a, b) => (b.isNew === true) - (a.isNew === true));
        break;
      case "price-desc":
        items.sort((a, b) => (b.price?.usd || 0) - (a.price?.usd || 0));
        break;
      case "price-asc":
        items.sort((a, b) => (a.price?.usd || 0) - (b.price?.usd || 0));
        break;
      case "name":
        items.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        items.sort((a, b) => (b.featured === true) - (a.featured === true));
        break;
    }

    return items;
  }, [brandProducts, filters, sortBy]);

  const savedProducts = useMemo(() => {
    return PRODUCTS.filter((product) => savedIds.includes(product.id));
  }, [savedIds]);

  const relatedProducts = useMemo(() => {
    if (!selectedProduct) {
      return [];
    }
    return brandProducts
      .filter((product) => product.id !== selectedProduct.id)
      .slice(0, 3);
  }, [brandProducts, selectedProduct]);

  const showPrice = config.id === "always_well";

  useEffect(() => {
    setFilters(DEFAULT_FILTERS);
    setSortBy("featured");
  }, [config.id]);

  useEffect(() => {
    const isOverlayOpen =
      showGateway || Object.values(modals).some((value) => value);
    if (typeof document === "undefined") {
      return;
    }
    document.body.style.overflow = isOverlayOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modals, showGateway]);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goHome = (id) => {
    setActiveBrand(id);
    setView("home");
    setSelectedProduct(null);
    setShowGateway(false);
    scrollToTop();
  };

  const goGroup = () => {
    setView("group");
    setSelectedProduct(null);
    setShowGateway(false);
    scrollToTop();
  };

  const goProduct = (product) => {
    const nextBrand = product.brand.toUpperCase();
    if (nextBrand !== activeBrand) {
      setActiveBrand(nextBrand);
    }
    setSelectedProduct(product);
    setView("product");
    setModals((prev) => ({ ...prev, search: false }));
    scrollToTop();
  };

  const toggleModal = (modalName, value) => {
    setModals((prev) => ({ ...prev, [modalName]: value }));
  };

  const toggleSave = (productId) => {
    setSavedIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const openContact = (product = null) => {
    setContactProduct(product);
    toggleModal("contact", true);
  };

  return (
    <div>
      <AnnouncementBar
        message="Matrix Group - Private appointments for SS26 now open."
        actionLabel="Book"
        onAction={() => toggleModal("appointment", true)}
      />

      <ContactModal
        open={modals.contact}
        onClose={() => {
          toggleModal("contact", false);
          setContactProduct(null);
        }}
        brandName={config.name}
        t={t}
        product={contactProduct}
      />
      <SearchModal
        open={modals.search}
        onClose={() => toggleModal("search", false)}
        products={PRODUCTS}
        t={t}
        onSelectProduct={goProduct}
        savedIds={savedIds}
        onToggleSave={toggleSave}
        currency={currency}
        showPrice={showPrice}
      />
      <AiConciergeModal
        open={modals.ai}
        onClose={() => toggleModal("ai", false)}
        t={t}
        brandId={config.id}
        products={PRODUCTS}
      />
      <AppointmentModal
        open={modals.appointment}
        onClose={() => toggleModal("appointment", false)}
        t={t}
        brands={BRANDS}
        locations={GROUP_LOCATIONS}
        defaultBrand={brandKey}
      />
      <SelectionDrawer
        open={modals.selection}
        onClose={() => toggleModal("selection", false)}
        items={savedProducts}
        currency={currency}
        onRemove={toggleSave}
        onSelectProduct={(product) => {
          toggleModal("selection", false);
          goProduct(product);
        }}
        onRequest={() => {
          toggleModal("selection", false);
          openContact();
        }}
      />

      {view === "group" && (
        <>
          <GlobalActions
            brandId="matrix"
            onSearch={() => toggleModal("search", true)}
            onAi={() => toggleModal("ai", true)}
            onGateway={() => setShowGateway(true)}
            onAppointment={() => toggleModal("appointment", true)}
            onSelection={() => toggleModal("selection", true)}
            selectionCount={savedIds.length}
            showGateway
          />
          <GroupHome
            brands={BRANDS}
            onSelectBrand={goHome}
            onOpenGateway={() => setShowGateway(true)}
          />
        </>
      )}

      {view === "home" && (
        <>
          <GlobalActions
            brandId={config.id}
            onSearch={() => toggleModal("search", true)}
            onAi={() => toggleModal("ai", true)}
            onGateway={() => setShowGateway(true)}
            onAppointment={() => toggleModal("appointment", true)}
            onSelection={() => toggleModal("selection", true)}
            selectionCount={savedIds.length}
            showGateway
          />
          <BrandIntro brand={config} onBackToGroup={goGroup} />
          <BrandHighlights brand={config} />
          <BrandFilterBar
            brandId={config.id}
            filters={filters}
            filterOptions={filterOptions}
            onChange={(update) => setFilters((prev) => ({ ...prev, ...update }))}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onReset={() => {
              setFilters(DEFAULT_FILTERS);
              setSortBy("featured");
            }}
            resultCount={filteredProducts.length}
            currency={currency}
            onCurrencyChange={setCurrency}
            showCurrency={showPrice}
          />
          {filteredProducts.length === 0 && (
            <div className="max-w-6xl mx-auto px-6 py-16 text-center text-sm text-stone-500">
              No pieces match the selected filters.
            </div>
          )}

          {config.id === "matrix" && (
            <MatrixListing
              products={filteredProducts}
              onSelect={goProduct}
              onToggleSave={toggleSave}
              savedIds={savedIds}
              currency={currency}
              showPrice={showPrice}
            />
          )}
          {config.id === "american_club" && (
            <ClubListing
              products={filteredProducts}
              onSelect={goProduct}
              onToggleSave={toggleSave}
              savedIds={savedIds}
              currency={currency}
              showPrice={showPrice}
            />
          )}
          {config.id === "always_well" && (
            <AlwaysWellListing
              products={filteredProducts}
              onSelect={goProduct}
              onToggleSave={toggleSave}
              savedIds={savedIds}
              currency={currency}
              showPrice={showPrice}
            />
          )}
          <BrandFooter brand={config} />
        </>
      )}

      {view === "product" && selectedProduct && (
        <>
          <GlobalActions
            brandId={config.id}
            onSearch={() => toggleModal("search", true)}
            onAi={() => toggleModal("ai", true)}
            onGateway={() => setShowGateway(true)}
            onAppointment={() => toggleModal("appointment", true)}
            onSelection={() => toggleModal("selection", true)}
            selectionCount={savedIds.length}
            showGateway
          />
          <ProductPage
            product={selectedProduct}
            brandId={config.id}
            onBack={() => {
              setView("home");
              scrollToTop();
            }}
            lang={lang}
            onContact={() => openContact(selectedProduct)}
            currency={currency}
            showPrice={showPrice}
            onToggleSave={toggleSave}
            savedIds={savedIds}
            relatedProducts={relatedProducts}
            onSelectRelated={goProduct}
          />
        </>
      )}

      {showGateway && (
        <HouseGateway
          onSelectBrand={(id) => goHome(id)}
          lang={lang}
          setLang={setLang}
          t={t}
          onClose={() => setShowGateway(false)}
        />
      )}
    </div>
  );
}
