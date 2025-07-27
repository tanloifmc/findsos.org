import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  User, Calendar, MapPin, Phone, Facebook, Mail, Camera, 
  ArrowLeft, Save, Eye, AlertCircle, Users, Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Badge } from '@/components/ui/badge.jsx';

const MissingPersonForm = ({ onBack, onSubmit }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    // Basic Information
    fullName: '',
    nickname: '',
    age: '',
    gender: '',
    lastSeenDate: '',
    lastSeenTime: '',
    
    // Physical Description
    height: '',
    weight: '',
    hairColor: '',
    eyeColor: '',
    skinTone: '',
    distinguishingMarks: '',
    
    // Clothing & Appearance
    lastSeenClothing: '',
    accessories: '',
    
    // Location Information
    lastSeenLocation: '',
    lastSeenAddress: '',
    possibleDestinations: '',
    
    // Medical & Mental Health
    medicalConditions: '',
    medications: '',
    mentalState: '',
    
    // Contact Information
    reporterName: '',
    reporterRelation: '',
    reporterPhone: '',
    reporterEmail: '',
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
        return formData.fullName && formData.age && formData.gender && formData.lastSeenDate;
      case 2:
        return formData.height && formData.hairColor && formData.eyeColor;
      case 3:
        return formData.lastSeenLocation && formData.reporterName && formData.reporterRelation;
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
            <CardTitle className="flex items-center text-purple-700">
              <Eye className="w-6 h-6 mr-2" />
              Preview Missing Person Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Basic Information</h3>
                <div className="space-y-2">
                  <p><strong>Full Name:</strong> {formData.fullName}</p>
                  <p><strong>Nickname:</strong> {formData.nickname || 'N/A'}</p>
                  <p><strong>Age:</strong> {formData.age}</p>
                  <p><strong>Gender:</strong> {formData.gender}</p>
                  <p><strong>Last Seen:</strong> {formData.lastSeenDate} at {formData.lastSeenTime}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-3">Physical Description</h3>
                <div className="space-y-2">
                  <p><strong>Height:</strong> {formData.height} cm</p>
                  <p><strong>Weight:</strong> {formData.weight} kg</p>
                  <p><strong>Hair Color:</strong> {formData.hairColor}</p>
                  <p><strong>Eye Color:</strong> {formData.eyeColor}</p>
                  <p><strong>Skin Tone:</strong> {formData.skinTone}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Last Seen Information</h3>
              <p><strong>Location:</strong> {formData.lastSeenLocation}</p>
              <p><strong>Address:</strong> {formData.lastSeenAddress}</p>
              <p><strong>Clothing:</strong> {formData.lastSeenClothing}</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Contact Information</h3>
              <p><strong>Reporter:</strong> {formData.reporterName} ({formData.reporterRelation})</p>
              <p><strong>Phone:</strong> {formData.reporterPhone}</p>
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
              <Button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700">
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
            <CardTitle className="flex items-center text-purple-700">
              <Users className="w-6 h-6 mr-2" />
              Report Missing Person - Step {currentStep} of 4
            </CardTitle>
            <div className="flex space-x-2 mt-4">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-2 flex-1 rounded ${
                    step <= currentStep ? 'bg-purple-600' : 'bg-gray-200'
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
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="nickname">Nickname / Known As</Label>
                  <Input
                    id="nickname"
                    value={formData.nickname}
                    onChange={(e) => handleInputChange('nickname', e.target.value)}
                    placeholder="Enter nickname or alias"
                  />
                </div>
                
                <div>
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    placeholder="Enter age"
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
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="lastSeenDate">Last Seen Date *</Label>
                  <Input
                    id="lastSeenDate"
                    type="date"
                    value={formData.lastSeenDate}
                    onChange={(e) => handleInputChange('lastSeenDate', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="lastSeenTime">Last Seen Time</Label>
                  <Input
                    id="lastSeenTime"
                    type="time"
                    value={formData.lastSeenTime}
                    onChange={(e) => handleInputChange('lastSeenTime', e.target.value)}
                  />
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
                    placeholder="Enter height in cm"
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
                    placeholder="Enter weight in kg"
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
                <Label htmlFor="lastSeenClothing">Last Seen Clothing</Label>
                <Textarea
                  id="lastSeenClothing"
                  value={formData.lastSeenClothing}
                  onChange={(e) => handleInputChange('lastSeenClothing', e.target.value)}
                  placeholder="Describe what they were wearing when last seen"
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
                  <Label htmlFor="lastSeenLocation">Last Seen Location *</Label>
                  <Input
                    id="lastSeenLocation"
                    value={formData.lastSeenLocation}
                    onChange={(e) => handleInputChange('lastSeenLocation', e.target.value)}
                    placeholder="Where were they last seen?"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="lastSeenAddress">Specific Address</Label>
                  <Input
                    id="lastSeenAddress"
                    value={formData.lastSeenAddress}
                    onChange={(e) => handleInputChange('lastSeenAddress', e.target.value)}
                    placeholder="Street address, landmarks, etc."
                  />
                </div>
                
                <div>
                  <Label htmlFor="possibleDestinations">Possible Destinations</Label>
                  <Textarea
                    id="possibleDestinations"
                    value={formData.possibleDestinations}
                    onChange={(e) => handleInputChange('possibleDestinations', e.target.value)}
                    placeholder="Places they might go (friends, family, favorite locations)"
                    rows={3}
                  />
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold mb-4">Reporter Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="reporterName">Your Name *</Label>
                    <Input
                      id="reporterName"
                      value={formData.reporterName}
                      onChange={(e) => handleInputChange('reporterName', e.target.value)}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="reporterRelation">Relationship to Missing Person *</Label>
                    <Select value={formData.reporterRelation} onValueChange={(value) => handleInputChange('reporterRelation', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="spouse">Spouse/Partner</SelectItem>
                        <SelectItem value="sibling">Sibling</SelectItem>
                        <SelectItem value="child">Child</SelectItem>
                        <SelectItem value="relative">Other Relative</SelectItem>
                        <SelectItem value="friend">Friend</SelectItem>
                        <SelectItem value="caregiver">Caregiver</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="reporterPhone">Phone Number</Label>
                    <Input
                      id="reporterPhone"
                      value={formData.reporterPhone}
                      onChange={(e) => handleInputChange('reporterPhone', e.target.value)}
                      placeholder="Your phone number"
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
                  <Label htmlFor="circumstances">Circumstances of Disappearance</Label>
                  <Textarea
                    id="circumstances"
                    value={formData.circumstances}
                    onChange={(e) => handleInputChange('circumstances', e.target.value)}
                    placeholder="Describe the circumstances when they went missing"
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="medicalConditions">Medical Conditions</Label>
                  <Textarea
                    id="medicalConditions"
                    value={formData.medicalConditions}
                    onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
                    placeholder="Any medical conditions, disabilities, or special needs"
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
                  className="bg-purple-600 hover:bg-purple-700"
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
                    className="bg-purple-600 hover:bg-purple-700"
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

export default MissingPersonForm;

