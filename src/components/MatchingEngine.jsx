import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Brain, Target, AlertCircle, CheckCircle, Clock, 
  Users, PawPrint, MapPin, Calendar, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Progress } from '@/components/ui/progress.jsx';

const MatchingEngine = ({ newReport, onMatchFound, onClose }) => {
  const { t } = useTranslation();
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [matches, setMatches] = useState([]);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  // Simulate intelligent matching process
  useEffect(() => {
    if (!newReport) return;

    const analyzeAndMatch = async () => {
      const steps = [
        { step: 'Analyzing physical characteristics...', progress: 20 },
        { step: 'Comparing location data...', progress: 40 },
        { step: 'Processing temporal information...', progress: 60 },
        { step: 'Calculating similarity scores...', progress: 80 },
        { step: 'Generating match results...', progress: 100 }
      ];

      for (const { step, progress } of steps) {
        setCurrentStep(step);
        setAnalysisProgress(progress);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Generate potential matches based on the new report
      const potentialMatches = generateMatches(newReport);
      setMatches(potentialMatches);
      setIsAnalyzing(false);

      // Notify parent component if high-confidence matches found
      const highConfidenceMatches = potentialMatches.filter(match => match.confidence > 80);
      if (highConfidenceMatches.length > 0) {
        onMatchFound(highConfidenceMatches);
      }
    };

    analyzeAndMatch();
  }, [newReport, onMatchFound]);

  const generateMatches = (report) => {
    // Sample existing reports to match against
    const existingReports = [
      {
        id: 'existing1',
        type: report.type === 'missing-person' ? 'found-person' : 'missing-person',
        name: 'John Doe',
        age: report.age || '25',
        gender: report.gender || 'male',
        location: 'Ho Chi Minh City',
        date: '2024-01-15',
        description: 'Height: 175cm, Brown hair, Blue eyes',
        reporter: 'Jane Doe',
        contact: 'facebook.com/janedoe'
      },
      {
        id: 'existing2',
        type: report.type === 'missing-pet' ? 'found-pet' : 'missing-pet',
        petName: 'Buddy',
        petType: report.petType || 'dog',
        breed: report.breed || 'Golden Retriever',
        location: 'Ho Chi Minh City',
        date: '2024-01-14',
        description: 'Large size, Golden color, Blue collar',
        owner: 'Lisa Johnson',
        contact: 'facebook.com/lisajohnson'
      }
    ];

    return existingReports.map(existing => {
      const confidence = calculateMatchConfidence(report, existing);
      return {
        ...existing,
        confidence,
        matchReasons: getMatchReasons(report, existing, confidence)
      };
    }).filter(match => match.confidence > 30).sort((a, b) => b.confidence - a.confidence);
  };

  const calculateMatchConfidence = (report, existing) => {
    let confidence = 0;
    let factors = 0;

    // Location matching (high weight)
    if (report.lastSeenLocation && existing.location) {
      const locationMatch = report.lastSeenLocation.toLowerCase().includes(existing.location.toLowerCase()) ||
                           existing.location.toLowerCase().includes(report.lastSeenLocation.toLowerCase());
      if (locationMatch) {
        confidence += 30;
      }
      factors++;
    }

    // Date proximity (medium weight)
    if (report.lastSeenDate && existing.date) {
      const reportDate = new Date(report.lastSeenDate);
      const existingDate = new Date(existing.date);
      const daysDiff = Math.abs((reportDate - existingDate) / (1000 * 60 * 60 * 24));
      
      if (daysDiff <= 1) confidence += 25;
      else if (daysDiff <= 3) confidence += 20;
      else if (daysDiff <= 7) confidence += 15;
      else if (daysDiff <= 14) confidence += 10;
      
      factors++;
    }

    // Physical characteristics matching
    if (report.type.includes('person')) {
      // Age matching
      if (report.age && existing.age) {
        const ageDiff = Math.abs(parseInt(report.age) - parseInt(existing.age));
        if (ageDiff <= 2) confidence += 15;
        else if (ageDiff <= 5) confidence += 10;
        else if (ageDiff <= 10) confidence += 5;
        factors++;
      }

      // Gender matching
      if (report.gender && existing.gender && report.gender === existing.gender) {
        confidence += 10;
      }
      factors++;

      // Physical description matching
      if (report.height && existing.description) {
        const heightMatch = existing.description.toLowerCase().includes(report.height);
        if (heightMatch) confidence += 10;
      }
      factors++;
    } else if (report.type.includes('pet')) {
      // Pet type matching
      if (report.petType && existing.petType && report.petType === existing.petType) {
        confidence += 20;
      }
      factors++;

      // Breed matching
      if (report.breed && existing.breed) {
        const breedMatch = report.breed.toLowerCase().includes(existing.breed.toLowerCase()) ||
                          existing.breed.toLowerCase().includes(report.breed.toLowerCase());
        if (breedMatch) confidence += 15;
      }
      factors++;

      // Size/color matching from description
      if (report.color && existing.description) {
        const colorMatch = existing.description.toLowerCase().includes(report.color.toLowerCase());
        if (colorMatch) confidence += 10;
      }
      factors++;
    }

    // Normalize confidence based on available factors
    return Math.min(Math.round(confidence * (factors > 0 ? 1 : 0)), 100);
  };

  const getMatchReasons = (report, existing, confidence) => {
    const reasons = [];
    
    if (confidence > 80) {
      reasons.push('High similarity in multiple characteristics');
    }
    if (confidence > 60) {
      reasons.push('Strong location and time correlation');
    }
    if (confidence > 40) {
      reasons.push('Matching physical descriptions');
    }
    if (confidence > 20) {
      reasons.push('Similar basic information');
    }

    return reasons;
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-green-600 bg-green-100';
    if (confidence >= 60) return 'text-orange-600 bg-orange-100';
    if (confidence >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getConfidenceLabel = (confidence) => {
    if (confidence >= 80) return t('highMatch');
    if (confidence >= 60) return t('mediumMatch');
    if (confidence >= 40) return t('lowMatch');
    return t('possibleMatch');
  };

  if (!newReport) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Brain className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-2xl font-bold">{t('intelligentMatching')}</h2>
            </div>
            <Button onClick={onClose} variant="outline" size="sm">
              ×
            </Button>
          </div>

          {isAnalyzing ? (
            <div className="text-center py-8">
              <div className="mb-6">
                <Zap className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-semibold mb-2">{t('analyzingReport')}</h3>
                <p className="text-muted-foreground">{currentStep}</p>
              </div>
              
              <div className="max-w-md mx-auto">
                <Progress value={analysisProgress} className="mb-2" />
                <p className="text-sm text-muted-foreground">{analysisProgress}% {t('complete')}</p>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="text-lg font-semibold">{t('analysisComplete')}</h3>
                </div>
                <p className="text-muted-foreground">
                  {matches.length > 0 
                    ? t('foundPotentialMatches', { count: matches.length })
                    : t('noMatchesFound')
                  }
                </p>
              </div>

              {matches.length > 0 ? (
                <div className="space-y-4">
                  {matches.map((match, index) => (
                    <Card key={match.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center">
                            {match.type.includes('person') ? (
                              <Users className="w-5 h-5 mr-2" />
                            ) : (
                              <PawPrint className="w-5 h-5 mr-2" />
                            )}
                            <div>
                              <h4 className="font-semibold">
                                {match.name || match.petName || `${match.type} Report`}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {match.type.includes('person') ? `${match.age} years old, ${match.gender}` : `${match.petType}, ${match.breed}`}
                              </p>
                            </div>
                          </div>
                          
                          <Badge className={getConfidenceColor(match.confidence)}>
                            <Target className="w-3 h-3 mr-1" />
                            {match.confidence}% {getConfidenceLabel(match.confidence)}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <MapPin className="w-4 h-4 mr-1 text-muted-foreground" />
                              {match.location}
                            </div>
                            <div className="flex items-center text-sm">
                              <Calendar className="w-4 h-4 mr-1 text-muted-foreground" />
                              {match.date}
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm">{match.description}</p>
                          </div>
                        </div>

                        <div className="mb-3">
                          <h5 className="text-sm font-medium mb-1">{t('matchReasons')}:</h5>
                          <ul className="text-sm text-muted-foreground">
                            {match.matchReasons.map((reason, idx) => (
                              <li key={idx} className="flex items-center">
                                <div className="w-1 h-1 bg-blue-600 rounded-full mr-2"></div>
                                {reason}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t">
                          <div className="text-sm text-muted-foreground">
                            {t('reportedBy')}: {match.reporter || match.owner}
                          </div>
                          
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              {t('viewDetails')}
                            </Button>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              {t('contact')}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{t('noMatchesFound')}</h3>
                    <p className="text-muted-foreground mb-4">{t('noMatchesDescription')}</p>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>• {t('matchTip1')}</p>
                      <p>• {t('matchTip2')}</p>
                      <p>• {t('matchTip3')}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
                <Button onClick={onClose} variant="outline">
                  {t('close')}
                </Button>
                {matches.length > 0 && (
                  <Button className="bg-green-600 hover:bg-green-700">
                    {t('notifyMatches')}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchingEngine;

