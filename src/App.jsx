import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Globe, Users, Clock, AlertTriangle, Languages, Search, Home, MapPin, 
  Phone, Facebook, Mail, ChevronDown, Menu, X,
  AlertCircle, PawPrint, Heart, HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import MissingPersonForm from './components/MissingPersonForm.jsx';
import FoundPersonForm from './components/FoundPersonForm.jsx';
import MissingPetForm from './components/MissingPetForm.jsx';
import FoundPetForm from './components/FoundPetForm.jsx';
import SearchResults from './components/SearchResults.jsx';
import MatchingEngine from './components/MatchingEngine.jsx';
import AdSenseSetup from './components/AdSenseSetup.jsx';
import { HeaderBannerAd, SidebarAd, InContentAd, FooterBannerAd, MobileBannerAd } from './components/AdSenseAd.jsx';
import PayPalDonation from './components/PayPalDonation.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import './App.css';
import './i18n.js';
import { Label } from "@/components/ui/label";



function App() {
  const { t, i18n } = useTranslation();
  const [currentView, setCurrentView] = useState('home');
  const [selectedCountry, setSelectedCountry] = useState('vietnam');
  const [selectedRegion, setSelectedRegion] = useState('ho-chi-minh-city');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Form states
  const [showMissingPersonForm, setShowMissingPersonForm] = useState(false);
  const [showFoundPersonForm, setShowFoundPersonForm] = useState(false);
  const [showMissingPetForm, setShowMissingPetForm] = useState(false);
  const [showFoundPetForm, setShowFoundPetForm] = useState(false);
  
  // Search and matching states
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchType, setSearchType] = useState('all');
  const [showMatchingEngine, setShowMatchingEngine] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);

  const countries = {
    vietnam: { 
      name: t('vietnam'), 
      regions: {
        'ho-chi-minh': t('hoChiMinh'),
        'hanoi': t('hanoi'),
        'da-nang': t('daNang'),
        'can-tho': t('canTho')
      }
    },
    usa: { 
      name: t('usa'), 
      regions: {
        'new-york': t('newYork'),
        'california': t('california'),
        'texas': t('texas'),
        'florida': t('florida')
      }
    },
    japan: { 
      name: t('japan'), 
      regions: {
        'tokyo': t('tokyo'),
        'osaka': t('osaka'),
        'kyoto': t('kyoto'),
        'hiroshima': t('hiroshima')
      }
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const NavigationBar = () => (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <span className="text-2xl">🆘</span>
                <span className="ml-2 text-xl font-bold text-gray-900">{t('appTitle')}</span>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => setCurrentView('home')}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'home'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Home className="w-4 h-4 mr-2" />
                  {t('home')}
                </button>
                <button
                  onClick={() => setCurrentView('emergency-map')}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'emergency-map'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {t('emergencyMap')}
                </button>
                <button
                  onClick={() => setCurrentView('sos')}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'sos'
                      ? 'bg-red-100 text-red-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  {t('sosEmergency')}
                </button>
                <button
                  onClick={() => setCurrentView('search')}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'search'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Search className="w-4 h-4 mr-2" />
                  {t('search')}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Select value={i18n.language} onValueChange={changeLanguage}>
                <SelectTrigger className="w-32">
                  <Languages className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">{t('english')}</SelectItem>
                  <SelectItem value="vi">{t('vietnamese')}</SelectItem>
                  <SelectItem value="ja">{t('japanese')}</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex items-center text-sm text-gray-600">
                <Globe className="w-4 h-4 mr-1" />
                {countries[selectedCountry]?.name || t('selectLocation')}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white shadow-sm border-b">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl">🆘</span>
              <span className="ml-2 text-lg font-bold text-gray-900">{t('appTitle')}</span>
            </div>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => { setCurrentView('home'); setIsMobileMenuOpen(false); }}
                className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  currentView === 'home'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Home className="w-5 h-5 mr-3" />
                {t('home')}
              </button>
              <button
                onClick={() => { setCurrentView('emergency-map'); setIsMobileMenuOpen(false); }}
                className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  currentView === 'emergency-map'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <MapPin className="w-5 h-5 mr-3" />
                {t('emergencyMap')}
              </button>
              <button
                onClick={() => { setCurrentView('sos'); setIsMobileMenuOpen(false); }}
                className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  currentView === 'sos'
                    ? 'bg-red-100 text-red-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <AlertTriangle className="w-5 h-5 mr-3" />
                {t('sosEmergency')}
              </button>
              <button
                onClick={() => { handleSearchClick(); setIsMobileMenuOpen(false); }}
                className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  showSearchResults
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Search className="w-5 h-5 mr-3" />
                {t('search')}
              </button>
            </div>
            
            <div className="border-t px-4 py-3">
              <div className="mb-3">
                <Label className="text-sm font-medium">{t('language')}</Label>
                <Select value={i18n.language} onValueChange={changeLanguage}>
                  <SelectTrigger className="w-full mt-1">
                    <Languages className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">{t('english')}</SelectItem>
                    <SelectItem value="vi">{t('vietnamese')}</SelectItem>
                    <SelectItem value="ja">{t('japanese')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Globe className="w-4 h-4 mr-2" />
                {countries[selectedCountry]?.name || t('selectLocation')}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );

  if (currentView === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <AdSenseSetup />
        <NavigationBar />
        
        {/* Header Banner Ad */}
        <div className="container mx-auto px-4 pt-4">
          <HeaderBannerAd className="mb-4" />
        </div>
        
        <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  🆘 {t('appTitle')}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t('appSubtitle')}
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center bg-white/50 px-4 py-2 rounded-full">
                <Globe className="w-4 h-4 mr-2" />
                {t('globalScope')}
              </div>
              <div className="flex items-center bg-white/50 px-4 py-2 rounded-full">
                <Users className="w-4 h-4 mr-2" />
                {t('communitySupport')}
              </div>
              <div className="flex items-center bg-white/50 px-4 py-2 rounded-full">
                <AlertTriangle className="w-4 h-4 mr-2" />
                {t('emergencyAlert')}
              </div>
            </div>
          </div>

          <Card className="mb-8 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                {t('selectLocation')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>{t('country')}</Label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(countries).map(([code, country]) => (
                        <SelectItem key={code} value={code}>{country.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{t('region')}</Label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(countries[selectedCountry].regions).map(([code, region]) => (
                        <SelectItem key={code} value={code}>{region}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Priority Order: SOS, People, Pets */}
          <div className="space-y-8">
            {/* SOS Emergency - Highest Priority */}
            <Card className="border-red-200 bg-red-50/50 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-red-700 text-2xl flex items-center">
                  <AlertTriangle className="w-8 h-8 mr-3" />
                  {t('sosTitle')} - Priority #1
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentView('sos')}>
                    <CardContent className="p-6 text-center">
                      <div className="text-6xl mb-4">🆘</div>
                      <h3 className="text-xl font-semibold mb-2 text-red-700">{t('sosTitle')}</h3>
                      <p className="text-muted-foreground mb-4">{t('sosDescription')}</p>
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentView('sos');
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        {t('sendSOS')}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentView('emergency-map')}>
                    <CardContent className="p-6 text-center">
                      <div className="text-6xl mb-4">⚠️</div>
                      <h3 className="text-xl font-semibold mb-2 text-orange-700">{t('disasterAlertTitle')}</h3>
                      <p className="text-muted-foreground mb-4">{t('disasterAlertDescription')}</p>
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentView('emergency-map');
                        }}
                        className="bg-orange-600 hover:bg-orange-700 text-white"
                      >
                        {t('viewEmergencyMap')}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Missing People - Second Priority */}
            <Card className="border-purple-200 bg-purple-50/50 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-purple-700 text-2xl flex items-center">
                  <Users className="w-8 h-8 mr-3" />
                  Missing People - Priority #2
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentView('post-missing-person')}>
                    <CardContent className="p-6 text-center">
                      <div className="text-6xl mb-4">👥</div>
                      <h3 className="text-xl font-semibold mb-2 text-purple-700">{t('missingPersonTitle')}</h3>
                      <p className="text-muted-foreground mb-4">{t('missingPersonDescription')}</p>
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowMissingPersonForm(true);
                        }}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        {t('postMissingPerson')}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentView('post-found-person')}>
                    <CardContent className="p-6 text-center">
                      <div className="text-6xl mb-4">🤝</div>
                      <h3 className="text-xl font-semibold mb-2 text-indigo-700">{t('foundPersonTitle')}</h3>
                      <p className="text-muted-foreground mb-4">{t('foundPersonDescription')}</p>
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowFoundPersonForm(true);
                        }}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white"
                      >
                        {t('postFoundPerson')}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Missing Pets - Third Priority */}
            <Card className="border-green-200 bg-green-50/50 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-green-700 text-2xl flex items-center">
                  <PawPrint className="w-8 h-8 mr-3" />
                  Missing Pets - Priority #3
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowMissingPetForm(true)}>
                    <CardContent className="p-6 text-center">
                      <div className="text-6xl mb-4">🔍</div>
                      <h3 className="text-xl font-semibold mb-2 text-blue-700">{t('missingPetTitle')}</h3>
                      <p className="text-muted-foreground mb-4">{t('missingPetDescription')}</p>
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowMissingPetForm(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {t('postMissingPet')}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowFoundPetForm(true)}>
                    <CardContent className="p-6 text-center">
                      <div className="text-6xl mb-4">🏠</div>
                      <h3 className="text-xl font-semibold mb-2 text-green-700">{t('foundPetTitle')}</h3>
                      <p className="text-muted-foreground mb-4">{t('foundPetDescription')}</p>
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowFoundPetForm(true);
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        {t('postFoundPet')}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
            
            {/* In-Content Ad */}
            <div className="my-8">
              <InContentAd />
            </div>

            <Card className="mt-8 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  {t('recentNews')} {countries[selectedCountry].regions[selectedRegion]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📰</div>
                  <p className="text-muted-foreground">{t('noNewsAvailable')}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {t('beFirstToPost')}
                  </p>
                </div>
              </CardContent>
            </Card>
            </div>

            {/* Sidebar with Ads */}
            <div className="lg:col-span-1 space-y-6">
              {/* Sidebar Ad */}
              <div className="sticky top-4">
                <SidebarAd />
              </div>
              
              {/* PayPal Donation */}
              <PayPalDonation compact={true} />
              
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('quickStats')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{t('activeCases')}</span>
                    <Badge variant="secondary">1,234</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{t('resolved')}</span>
                    <Badge className="bg-green-100 text-green-800">567</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{t('thisWeek')}</span>
                    <Badge className="bg-blue-100 text-blue-800">89</Badge>
                  </div>
                </CardContent>
              </Card>
              
              {/* Another Sidebar Ad */}
              <SidebarAd />
            </div>
          </div>
          
          {/* Footer Banner Ad */}
          <div className="mt-12">
            <FooterBannerAd />
          </div>
        </div>
        
        {/* Mobile Sticky Banner Ad */}
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t shadow-lg">
          <MobileBannerAd />
        </div>
      </div>
    );
  }

  // Form handlers
  const handleMissingPersonSubmit = (formData) => {
    console.log('Missing Person Report:', formData);
    setCurrentReport({ ...formData, type: 'missing-person' });
    setShowMatchingEngine(true);
    setShowMissingPersonForm(false);
  };

  const handleFoundPersonSubmit = (formData) => {
    console.log('Found Person Report:', formData);
    setCurrentReport({ ...formData, type: 'found-person' });
    setShowMatchingEngine(true);
    setShowFoundPersonForm(false);
  };

  const handleMissingPetSubmit = (formData) => {
    console.log('Missing Pet Report:', formData);
    setCurrentReport({ ...formData, type: 'missing-pet' });
    setShowMatchingEngine(true);
    setShowMissingPetForm(false);
  };

  const handleFoundPetSubmit = (formData) => {
    console.log('Found Pet Report:', formData);
    setCurrentReport({ ...formData, type: 'found-pet' });
    setShowMatchingEngine(true);
    setShowFoundPetForm(false);
  };

  const handleMatchFound = (matches) => {
    console.log('High confidence matches found:', matches);
    // In real app, this would trigger notifications
  };

  const handleSearchClick = (type = 'all') => {
    setSearchType(type);
    setShowSearchResults(true);
  };

  // Show search results
  if (showSearchResults) {
    return <SearchResults onBack={() => setShowSearchResults(false)} searchType={searchType} />;
  }

  // Show forms if requested
  if (showMissingPersonForm) {
    return <MissingPersonForm onBack={() => setShowMissingPersonForm(false)} onSubmit={handleMissingPersonSubmit} />;
  }
  
  if (showFoundPersonForm) {
    return <FoundPersonForm onBack={() => setShowFoundPersonForm(false)} onSubmit={handleFoundPersonSubmit} />;
  }
  
  if (showMissingPetForm) {
    return <MissingPetForm onBack={() => setShowMissingPetForm(false)} onSubmit={handleMissingPetSubmit} />;
  }
  
  if (showFoundPetForm) {
    return <FoundPetForm onBack={() => setShowFoundPetForm(false)} onSubmit={handleFoundPetSubmit} />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <NavigationBar />
      
      <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{t('appTitle')}</h1>
          <p className="text-muted-foreground mb-4">
            {currentView === 'sos' && t('sosTitle')}
            {currentView === 'emergency-map' && t('emergencyMap')}
            {currentView === 'search' && t('search')}
            {currentView === 'post-missing-person' && t('missingPersonTitle')}
            {currentView === 'post-found-person' && t('foundPersonTitle')}
            {currentView === 'post-missing-pet' && t('missingPetTitle')}
            {currentView === 'post-found-pet' && t('foundPetTitle')}
            {' '}{t('loading')}...
          </p>
          <Button 
            onClick={() => setCurrentView('home')}
            className="mt-4"
          >
            {t('back')}
          </Button>
        </div>
      </div>
      
      {/* Matching Engine Modal */}
      {showMatchingEngine && (
        <MatchingEngine
          newReport={currentReport}
          onMatchFound={handleMatchFound}
          onClose={() => {
            setShowMatchingEngine(false);
            setCurrentReport(null);
            setCurrentView('home');
          }}
        />
      )}
    </div>
  );
};

export default App;

