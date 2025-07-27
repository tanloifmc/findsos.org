import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Search, Filter, MapPin, Calendar, User, PawPrint, 
  Phone, Facebook, Mail, Eye, Heart, Share2, AlertCircle,
  ChevronDown, ChevronUp, Users, Home
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Label } from "@/components/ui/label";


const SearchResults = ({ onBack, searchType = 'all' }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchType);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showFilters, setShowFilters] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState([]);

  // Sample data - in real app this would come from backend
  const sampleResults = {
    missingPeople: [
      {
        id: 'mp1',
        type: 'missing-person',
        name: 'John Smith',
        age: 25,
        gender: 'male',
        lastSeen: '2024-01-15',
        location: 'Ho Chi Minh City',
        description: 'Height: 175cm, Brown hair, Blue eyes',
        photo: null,
        reporter: 'Sarah Smith',
        contact: 'facebook.com/sarahsmith',
        urgent: true,
        matchScore: 0
      },
      {
        id: 'mp2',
        type: 'missing-person',
        name: 'Maria Garcia',
        age: 45,
        gender: 'female',
        lastSeen: '2024-01-10',
        location: 'Hanoi',
        description: 'Height: 160cm, Black hair, Brown eyes',
        photo: null,
        reporter: 'Carlos Garcia',
        contact: 'facebook.com/carlosgarcia',
        urgent: false,
        matchScore: 0
      }
    ],
    foundPeople: [
      {
        id: 'fp1',
        type: 'found-person',
        estimatedAge: '20-30',
        gender: 'male',
        foundDate: '2024-01-16',
        location: 'Ho Chi Minh City',
        description: 'Height: 170-180cm, Brown hair, Confused state',
        photo: null,
        finder: 'Nguyen Van A',
        contact: 'facebook.com/nguyenvana',
        currentLocation: 'District 1 Hospital',
        matchScore: 85
      }
    ],
    missingPets: [
      {
        id: 'pet1',
        type: 'missing-pet',
        name: 'Buddy',
        petType: 'dog',
        breed: 'Golden Retriever',
        age: '3 years',
        lastSeen: '2024-01-14',
        location: 'Ho Chi Minh City',
        description: 'Large size, Golden color, Blue collar',
        photo: null,
        owner: 'Lisa Johnson',
        contact: 'facebook.com/lisajohnson',
        reward: '$200',
        matchScore: 0
      }
    ],
    foundPets: [
      {
        id: 'fp1',
        type: 'found-pet',
        petType: 'dog',
        breed: 'Golden Retriever mix',
        estimatedAge: '2-4 years',
        foundDate: '2024-01-15',
        location: 'Ho Chi Minh City',
        description: 'Large size, Golden color, No collar',
        photo: null,
        finder: 'Mike Wilson',
        contact: 'facebook.com/mikewilson',
        currentLocation: 'District 3 Vet Clinic',
        matchScore: 92
      }
    ]
  };

  useEffect(() => {
    // Simulate loading and matching
    setLoading(true);
    setTimeout(() => {
      let allResults = [];
      
      if (selectedCategory === 'all' || selectedCategory === 'missing-people') {
        allResults = [...allResults, ...sampleResults.missingPeople];
      }
      if (selectedCategory === 'all' || selectedCategory === 'found-people') {
        allResults = [...allResults, ...sampleResults.foundPeople];
      }
      if (selectedCategory === 'all' || selectedCategory === 'missing-pets') {
        allResults = [...allResults, ...sampleResults.missingPets];
      }
      if (selectedCategory === 'all' || selectedCategory === 'found-pets') {
        allResults = [...allResults, ...sampleResults.foundPets];
      }

      // Filter by search query
      if (searchQuery) {
        allResults = allResults.filter(item => 
          (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.location && item.location.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }

      // Filter by location
      if (selectedLocation !== 'all') {
        allResults = allResults.filter(item => 
          item.location.toLowerCase().includes(selectedLocation.toLowerCase())
        );
      }

      // Sort results
      allResults.sort((a, b) => {
        if (sortBy === 'recent') {
          const dateA = new Date(a.lastSeen || a.foundDate);
          const dateB = new Date(b.lastSeen || b.foundDate);
          return dateB - dateA;
        } else if (sortBy === 'match') {
          return b.matchScore - a.matchScore;
        } else if (sortBy === 'urgent') {
          return (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0);
        }
        return 0;
      });

      setResults(allResults);
      
      // Find potential matches
      const potentialMatches = allResults.filter(item => item.matchScore > 70);
      setMatches(potentialMatches);
      
      setLoading(false);
    }, 1000);
  }, [searchQuery, selectedCategory, selectedLocation, sortBy]);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'missing-person': return <Users className="w-5 h-5" />;
      case 'found-person': return <User className="w-5 h-5" />;
      case 'missing-pet': return <PawPrint className="w-5 h-5" />;
      case 'found-pet': return <Home className="w-5 h-5" />;
      default: return <Search className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'missing-person': return 'text-purple-600 bg-purple-100';
      case 'found-person': return 'text-indigo-600 bg-indigo-100';
      case 'missing-pet': return 'text-blue-600 bg-blue-100';
      case 'found-pet': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'missing-person': return t('missingPerson');
      case 'found-person': return t('foundPerson');
      case 'missing-pet': return t('missingPet');
      case 'found-pet': return t('foundPet');
      default: return type;
    }
  };

  const handleContactReveal = (item) => {
    // In real app, this would log the contact reveal and possibly require verification
    alert(`Contact: ${item.contact}\nPhone: ${item.phone || 'Not provided'}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button onClick={onBack} variant="outline" className="mb-4">
            <ChevronDown className="w-4 h-4 mr-2 rotate-90" />
            {t('back')}
          </Button>
          
          <h1 className="text-3xl font-bold mb-2">{t('searchResults')}</h1>
          <p className="text-muted-foreground">{t('searchResultsDescription')}</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder={t('searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant="outline"
                  className="md:w-auto"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {t('filters')}
                  {showFilters ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
                </Button>
              </div>

              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <Label>{t('category')}</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('allCategories')}</SelectItem>
                        <SelectItem value="missing-people">{t('missingPeople')}</SelectItem>
                        <SelectItem value="found-people">{t('foundPeople')}</SelectItem>
                        <SelectItem value="missing-pets">{t('missingPets')}</SelectItem>
                        <SelectItem value="found-pets">{t('foundPets')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>{t('location')}</Label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('allLocations')}</SelectItem>
                        <SelectItem value="ho-chi-minh-city">Ho Chi Minh City</SelectItem>
                        <SelectItem value="hanoi">Hanoi</SelectItem>
                        <SelectItem value="da-nang">Da Nang</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>{t('sortBy')}</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">{t('mostRecent')}</SelectItem>
                        <SelectItem value="match">{t('bestMatch')}</SelectItem>
                        <SelectItem value="urgent">{t('urgent')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Potential Matches Alert */}
        {matches.length > 0 && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-orange-600 mr-2" />
                <div>
                  <h3 className="font-semibold text-orange-800">{t('potentialMatches')}</h3>
                  <p className="text-sm text-orange-700">
                    {t('foundPotentialMatches', { count: matches.length })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p>{t('searching')}...</p>
            </div>
          ) : results.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{t('noResults')}</h3>
                <p className="text-muted-foreground">{t('noResultsDescription')}</p>
              </CardContent>
            </Card>
          ) : (
            results.map((item) => (
              <Card key={item.id} className={`hover:shadow-lg transition-shadow ${item.matchScore > 70 ? 'border-orange-200 bg-orange-50/30' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Photo placeholder */}
                    <div className="w-full md:w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {item.photo ? (
                        <img src={item.photo} alt="Photo" className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <div className="text-center">
                          {getTypeIcon(item.type)}
                          <p className="text-xs text-gray-500 mt-1">{t('noPhoto')}</p>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getTypeColor(item.type)}>
                              {getTypeIcon(item.type)}
                              <span className="ml-1">{getTypeLabel(item.type)}</span>
                            </Badge>
                            {item.urgent && (
                              <Badge variant="destructive">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                {t('urgent')}
                              </Badge>
                            )}
                            {item.matchScore > 70 && (
                              <Badge className="bg-orange-100 text-orange-800">
                                {item.matchScore}% {t('match')}
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-xl font-semibold">
                            {item.name || `${getTypeLabel(item.type)} - ${item.estimatedAge || item.age}`}
                          </h3>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Share2 className="w-4 h-4 mr-1" />
                            {t('share')}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Heart className="w-4 h-4 mr-1" />
                            {t('save')}
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4 mr-2" />
                            {item.lastSeen ? `${t('lastSeen')}: ${item.lastSeen}` : `${t('found')}: ${item.foundDate}`}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 mr-2" />
                            {item.location}
                          </div>
                          {item.currentLocation && (
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Home className="w-4 h-4 mr-2" />
                              {t('currentLocation')}: {item.currentLocation}
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm">{item.description}</p>
                          {item.reward && (
                            <div className="text-sm font-semibold text-green-600">
                              {t('reward')}: {item.reward}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between pt-4 border-t">
                        <div className="text-sm text-muted-foreground">
                          {t('reportedBy')}: {item.reporter || item.finder || item.owner}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            size="sm"
                            onClick={() => handleContactReveal(item)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <Facebook className="w-4 h-4 mr-1" />
                            {t('contact')}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            {t('viewDetails')}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Load More */}
        {results.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              {t('loadMore')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;

