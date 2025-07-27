import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  User, Calendar, MapPin, Phone, Facebook, Mail, Camera, 
  ArrowLeft, Save, Eye, AlertCircle, Users, Heart, HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Label } from "@/components/ui/label";


const FoundPersonForm = ({ onBack, onSubmit }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    // Person Found Information
    estimatedAge: '',
    gender: '',
    foundDate: '',
    foundTime: '',
    
    // Physical Description
    height: '',
    weight: '',
    hairColor: '',
    eyeColor: '',
    skinTone: '',
    distinguishingMarks: '',
    
    // Clothing & Appearance
    clothing: '',
    accessories: '',
    
    // Location Information
    foundLocation: '',
    foundAddress: '',
    currentLocation: '',
    
    // Condition & Behavior
    physicalCondition: '',
    mentalState: '',
    canCommunicate: '',
    languageSpoken: '',
    remembersName: '',
    remembersDetails: '',
    
    // Finder Information
    finderName: '',
    finderPhone: '',
    finderEmail: '',
    facebookProfile: '',
    
    // Additional Information
    circumstances: '',
    additionalInfo: '',
    photos: []
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files]
    }));
  };

  const removePhoto = (index) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.estimatedAge && formData.gender && formData.foundDate;
      case 2:
        return formData.height && formData.hairColor && formData.eyeColor;
      case 3:
        return formData.foundLocation && formData.finderName;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      onSubmit(formData);
    }
  };

  if (showPreview) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-indigo-700">
              <Eye className="w-6 h-6 mr-2" />
              Preview Found Person Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Person Found</h3>
                <div className="space-y-2">
                  <p><strong>Estimated Age:</strong> {formData.estimatedAge}</p>
                  <p><strong>Gender:</strong> {formData.gender}</p>
                  <p><strong>Found Date:</strong> {formData.foundDate} at {formData.foundTime}</p>
                  <p><strong>Height:</strong> {formData.height} cm</p>
                  <p><strong>Hair Color:</strong> {formData.hairColor}</p>
                  <p><strong>Eye Color:</strong> {formData.eyeColor}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-3">Communication</h3>
                <div className="space-y-2">
                  <p><strong>Can Communicate:</strong> {formData.canCommunicate}</p>
                  <p><strong>Language:</strong> {formData.languageSpoken}</p>
                  <p><strong>Remembers Name:</strong> {formData.remembersName}</p>
                  <p><strong>Remembers Details:</strong> {formData.remembersDetails}</p>
                  <p><strong>Mental State:</strong> {formData.mentalState}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Location Information</h3>
              <p><strong>Found At:</strong> {formData.foundLocation}</p>
              <p><strong>Address:</strong> {formData.foundAddress}</p>
              <p><strong>Current Location:</strong> {formData.currentLocation}</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Finder Contact</h3>
              <p><strong>Name:</strong> {formData.finderName}</p>
              <p><strong>Phone:</strong> {formData.finderPhone}</p>
              <p><strong>Facebook:</strong> {formData.facebookProfile}</p>
            </div>

            {formData.photos.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-3">Photos ({formData.photos.length})</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              <Button onClick={() => setShowPreview(false)} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button onClick={handleSubmit} className="bg-indigo-600 hover:bg-indigo-700">
                <Save className="w-4 h-4 mr-2" />
                Submit Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Button onClick={onBack} variant="outline" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('back')}
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-indigo-700">
              <HelpCircle className="w-6 h-6 mr-2" />
              Report Found Person - Step {currentStep} of 4
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Help reunite a found person with their family
            </p>
            <div className="flex space-x-2 mt-4">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-2 flex-1 rounded ${
                    step <= currentStep ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="estimatedAge">Estimated Age *</Label>
                  <Input
                    id="estimatedAge"
                    value={formData.estimatedAge}
                    onChange={(e) => handleInputChange('estimatedAge', e.target.value)}
                    placeholder="Estimated age (e.g., 25-30)"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="gender">Gender *</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="foundDate">Date Found *</Label>
                  <Input
                    id="foundDate"
                    type="date"
                    value={formData.foundDate}
                    onChange={(e) => handleInputChange('foundDate', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="foundTime">Time Found</Label>
                  <Input
                    id="foundTime"
                    type="time"
                    value={formData.foundTime}
                    onChange={(e) => handleInputChange('foundTime', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="canCommunicate">Can Communicate?</Label>
                  <Select value={formData.canCommunicate} onValueChange={(value) => handleInputChange('canCommunicate', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select communication ability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes, can speak clearly</SelectItem>
                      <SelectItem value="limited">Limited communication</SelectItem>
                      <SelectItem value="no">Cannot communicate</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="languageSpoken">Language Spoken</Label>
                  <Input
                    id="languageSpoken"
                    value={formData.languageSpoken}
                    onChange={(e) => handleInputChange('languageSpoken', e.target.value)}
                    placeholder="What language do they speak?"
                  />
                </div>
                
                <div>
                  <Label htmlFor="remembersName">Remembers Their Name?</Label>
                  <Select value={formData.remembersName} onValueChange={(value) => handleInputChange('remembersName', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Do they remember their name?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="partial">Partial/Unclear</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="remembersDetails">Remembers Personal Details?</Label>
                  <Select value={formData.remembersDetails} onValueChange={(value) => handleInputChange('remembersDetails', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Do they remember family/address?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes, remembers details</SelectItem>
                      <SelectItem value="some">Some details</SelectItem>
                      <SelectItem value="no">No memory of details</SelectItem>
                      <SelectItem value="confused">Confused/Disoriented</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Physical Description</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="height">Height (cm) *</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                    placeholder="Estimated height in cm"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    placeholder="Estimated weight in kg"
                  />
                </div>
                
                <div>
                  <Label htmlFor="hairColor">Hair Color *</Label>
                  <Select value={formData.hairColor} onValueChange={(value) => handleInputChange('hairColor', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select hair color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="black">Black</SelectItem>
                      <SelectItem value="brown">Brown</SelectItem>
                      <SelectItem value="blonde">Blonde</SelectItem>
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="gray">Gray</SelectItem>
                      <SelectItem value="white">White</SelectItem>
                      <SelectItem value="bald">Bald</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="eyeColor">Eye Color *</Label>
                  <Select value={formData.eyeColor} onValueChange={(value) => handleInputChange('eyeColor', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select eye color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brown">Brown</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="hazel">Hazel</SelectItem>
                      <SelectItem value="gray">Gray</SelectItem>
                      <SelectItem value="amber">Amber</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="skinTone">Skin Tone</Label>
                  <Select value={formData.skinTone} onValueChange={(value) => handleInputChange('skinTone', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select skin tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="very-light">Very Light</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="olive">Olive</SelectItem>
                      <SelectItem value="tan">Tan</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="very-dark">Very Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="physicalCondition">Physical Condition</Label>
                  <Select value={formData.physicalCondition} onValueChange={(value) => handleInputChange('physicalCondition', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select physical condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="good">Good health</SelectItem>
                      <SelectItem value="injured">Injured</SelectItem>
                      <SelectItem value="sick">Appears sick</SelectItem>
                      <SelectItem value="malnourished">Malnourished</SelectItem>
                      <SelectItem value="disabled">Has disability</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="distinguishingMarks">Distinguishing Marks</Label>
                <Textarea
                  id="distinguishingMarks"
                  value={formData.distinguishingMarks}
                  onChange={(e) => handleInputChange('distinguishingMarks', e.target.value)}
                  placeholder="Scars, tattoos, birthmarks, etc."
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="clothing">Clothing & Appearance</Label>
                <Textarea
                  id="clothing"
                  value={formData.clothing}
                  onChange={(e) => handleInputChange('clothing', e.target.value)}
                  placeholder="Describe what they are wearing"
                  rows={3}
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Location & Contact Information</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="foundLocation">Where Found *</Label>
                  <Input
                    id="foundLocation"
                    value={formData.foundLocation}
                    onChange={(e) => handleInputChange('foundLocation', e.target.value)}
                    placeholder="Where did you find this person?"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="foundAddress">Specific Address</Label>
                  <Input
                    id="foundAddress"
                    value={formData.foundAddress}
                    onChange={(e) => handleInputChange('foundAddress', e.target.value)}
                    placeholder="Street address, landmarks, etc."
                  />
                </div>
                
                <div>
                  <Label htmlFor="currentLocation">Current Location</Label>
                  <Input
                    id="currentLocation"
                    value={formData.currentLocation}
                    onChange={(e) => handleInputChange('currentLocation', e.target.value)}
                    placeholder="Where is the person now? (hospital, police station, etc.)"
                  />
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold mb-4">Your Contact Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="finderName">Your Name *</Label>
                    <Input
                      id="finderName"
                      value={formData.finderName}
                      onChange={(e) => handleInputChange('finderName', e.target.value)}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="finderPhone">Phone Number</Label>
                    <Input
                      id="finderPhone"
                      value={formData.finderPhone}
                      onChange={(e) => handleInputChange('finderPhone', e.target.value)}
                      placeholder="Your phone number"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="finderEmail">Email</Label>
                    <Input
                      id="finderEmail"
                      type="email"
                      value={formData.finderEmail}
                      onChange={(e) => handleInputChange('finderEmail', e.target.value)}
                      placeholder="Your email address"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="facebookProfile">Facebook Profile (Recommended)</Label>
                    <Input
                      id="facebookProfile"
                      value={formData.facebookProfile}
                      onChange={(e) => handleInputChange('facebookProfile', e.target.value)}
                      placeholder="Facebook profile URL or username"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Additional Information & Photos</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="circumstances">Circumstances of Finding</Label>
                  <Textarea
                    id="circumstances"
                    value={formData.circumstances}
                    onChange={(e) => handleInputChange('circumstances', e.target.value)}
                    placeholder="Describe how and where you found this person"
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="mentalState">Mental State</Label>
                  <Textarea
                    id="mentalState"
                    value={formData.mentalState}
                    onChange={(e) => handleInputChange('mentalState', e.target.value)}
                    placeholder="Describe their mental state (confused, calm, distressed, etc.)"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                    placeholder="Any other relevant information"
                    rows={3}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="photos">Photos</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Please only upload photos with the person's consent or if they cannot consent due to their condition
                </p>
                <div className="mt-2">
                  <input
                    type="file"
                    id="photos"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('photos').click()}
                    className="w-full"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Upload Photos
                  </Button>
                </div>
                
                {formData.photos.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">
                      {formData.photos.length} photo(s) selected
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {formData.photos.map((photo, index) => (
                        <div key={index} className="relative">
                          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                            <Camera className="w-8 h-8 text-gray-400" />
                          </div>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                            onClick={() => removePhoto(index)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <div>
              {currentStep > 1 && (
                <Button onClick={prevStep} variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
              )}
            </div>
            
            <div className="space-x-2">
              {currentStep < 4 ? (
                <Button 
                  onClick={nextStep}
                  disabled={!validateStep(currentStep)}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Next
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Button>
              ) : (
                <>
                  <Button onClick={() => setShowPreview(true)} variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={!validateStep(currentStep)}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Submit Report
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FoundPersonForm;

