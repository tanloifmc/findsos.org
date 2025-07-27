import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  PawPrint, Calendar, MapPin, Phone, Facebook, Mail, Camera, 
  ArrowLeft, Save, Eye, AlertCircle, Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Badge } from '@/components/ui/badge.jsx';

const MissingPetForm = ({ onBack, onSubmit }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    // Basic Pet Information
    petName: '',
    petType: '',
    breed: '',
    age: '',
    gender: '',
    lastSeenDate: '',
    lastSeenTime: '',
    
    // Physical Description
    size: '',
    weight: '',
    color: '',
    markings: '',
    distinguishingFeatures: '',
    
    // Behavior & Characteristics
    temperament: '',
    specialNeeds: '',
    microchipped: '',
    microchipNumber: '',
    
    // Collar & Identification
    hasCollar: '',
    collarDescription: '',
    hasTags: '',
    tagInfo: '',
    
    // Location Information
    lastSeenLocation: '',
    lastSeenAddress: '',
    usualHangouts: '',
    
    // Owner Information
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    facebookProfile: '',
    
    // Additional Information
    circumstances: '',
    reward: '',
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
        return formData.petName && formData.petType && formData.lastSeenDate;
      case 2:
        return formData.size && formData.color;
      case 3:
        return formData.lastSeenLocation && formData.ownerName;
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
            <CardTitle className="flex items-center text-blue-700">
              <Eye className="w-6 h-6 mr-2" />
              Preview Missing Pet Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Pet Information</h3>
                <div className="space-y-2">
                  <p><strong>Name:</strong> {formData.petName}</p>
                  <p><strong>Type:</strong> {formData.petType}</p>
                  <p><strong>Breed:</strong> {formData.breed}</p>
                  <p><strong>Age:</strong> {formData.age}</p>
                  <p><strong>Gender:</strong> {formData.gender}</p>
                  <p><strong>Last Seen:</strong> {formData.lastSeenDate} at {formData.lastSeenTime}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-3">Physical Description</h3>
                <div className="space-y-2">
                  <p><strong>Size:</strong> {formData.size}</p>
                  <p><strong>Weight:</strong> {formData.weight} kg</p>
                  <p><strong>Color:</strong> {formData.color}</p>
                  <p><strong>Markings:</strong> {formData.markings}</p>
                  <p><strong>Microchipped:</strong> {formData.microchipped}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Last Seen Information</h3>
              <p><strong>Location:</strong> {formData.lastSeenLocation}</p>
              <p><strong>Address:</strong> {formData.lastSeenAddress}</p>
              <p><strong>Collar:</strong> {formData.hasCollar === 'yes' ? formData.collarDescription : 'No collar'}</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Owner Contact</h3>
              <p><strong>Name:</strong> {formData.ownerName}</p>
              <p><strong>Phone:</strong> {formData.ownerPhone}</p>
              <p><strong>Facebook:</strong> {formData.facebookProfile}</p>
              {formData.reward && <p><strong>Reward:</strong> {formData.reward}</p>}
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
              <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
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
            <CardTitle className="flex items-center text-blue-700">
              <PawPrint className="w-6 h-6 mr-2" />
              Report Missing Pet - Step {currentStep} of 4
            </CardTitle>
            <div className="flex space-x-2 mt-4">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-2 flex-1 rounded ${
                    step <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
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
              <h3 className="text-xl font-semibold mb-4">Pet Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="petName">Pet Name *</Label>
                  <Input
                    id="petName"
                    value={formData.petName}
                    onChange={(e) => handleInputChange('petName', e.target.value)}
                    placeholder="Enter pet's name"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="petType">Pet Type *</Label>
                  <Select value={formData.petType} onValueChange={(value) => handleInputChange('petType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pet type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dog">Dog</SelectItem>
                      <SelectItem value="cat">Cat</SelectItem>
                      <SelectItem value="bird">Bird</SelectItem>
                      <SelectItem value="rabbit">Rabbit</SelectItem>
                      <SelectItem value="hamster">Hamster</SelectItem>
                      <SelectItem value="guinea-pig">Guinea Pig</SelectItem>
                      <SelectItem value="ferret">Ferret</SelectItem>
                      <SelectItem value="reptile">Reptile</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="breed">Breed</Label>
                  <Input
                    id="breed"
                    value={formData.breed}
                    onChange={(e) => handleInputChange('breed', e.target.value)}
                    placeholder="Enter breed (e.g., Golden Retriever)"
                  />
                </div>
                
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    placeholder="Enter age (e.g., 2 years, 6 months)"
                  />
                </div>
                
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="neutered-male">Neutered Male</SelectItem>
                      <SelectItem value="spayed-female">Spayed Female</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
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
                  <Label htmlFor="size">Size *</Label>
                  <Select value={formData.size} onValueChange={(value) => handleInputChange('size', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tiny">Tiny (under 5 lbs)</SelectItem>
                      <SelectItem value="small">Small (5-25 lbs)</SelectItem>
                      <SelectItem value="medium">Medium (25-60 lbs)</SelectItem>
                      <SelectItem value="large">Large (60-100 lbs)</SelectItem>
                      <SelectItem value="extra-large">Extra Large (over 100 lbs)</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <Label htmlFor="color">Primary Color *</Label>
                  <Input
                    id="color"
                    value={formData.color}
                    onChange={(e) => handleInputChange('color', e.target.value)}
                    placeholder="Enter primary color (e.g., Brown, Black, White)"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="markings">Markings/Patterns</Label>
                  <Input
                    id="markings"
                    value={formData.markings}
                    onChange={(e) => handleInputChange('markings', e.target.value)}
                    placeholder="Spots, stripes, patches, etc."
                  />
                </div>
                
                <div>
                  <Label htmlFor="microchipped">Microchipped?</Label>
                  <Select value={formData.microchipped} onValueChange={(value) => handleInputChange('microchipped', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Is your pet microchipped?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {formData.microchipped === 'yes' && (
                  <div>
                    <Label htmlFor="microchipNumber">Microchip Number</Label>
                    <Input
                      id="microchipNumber"
                      value={formData.microchipNumber}
                      onChange={(e) => handleInputChange('microchipNumber', e.target.value)}
                      placeholder="Enter microchip number"
                    />
                  </div>
                )}
              </div>
              
              <div>
                <Label htmlFor="distinguishingFeatures">Distinguishing Features</Label>
                <Textarea
                  id="distinguishingFeatures"
                  value={formData.distinguishingFeatures}
                  onChange={(e) => handleInputChange('distinguishingFeatures', e.target.value)}
                  placeholder="Unique features, scars, unusual markings, etc."
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="temperament">Temperament</Label>
                <Textarea
                  id="temperament"
                  value={formData.temperament}
                  onChange={(e) => handleInputChange('temperament', e.target.value)}
                  placeholder="Friendly, shy, aggressive, etc. How does your pet behave around strangers?"
                  rows={3}
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Collar & Identification</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hasCollar">Has Collar?</Label>
                  <Select value={formData.hasCollar} onValueChange={(value) => handleInputChange('hasCollar', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Does your pet have a collar?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {formData.hasCollar === 'yes' && (
                  <div>
                    <Label htmlFor="collarDescription">Collar Description</Label>
                    <Input
                      id="collarDescription"
                      value={formData.collarDescription}
                      onChange={(e) => handleInputChange('collarDescription', e.target.value)}
                      placeholder="Color, material, style of collar"
                    />
                  </div>
                )}
                
                <div>
                  <Label htmlFor="hasTags">Has ID Tags?</Label>
                  <Select value={formData.hasTags} onValueChange={(value) => handleInputChange('hasTags', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Does your pet have ID tags?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {formData.hasTags === 'yes' && (
                  <div>
                    <Label htmlFor="tagInfo">Tag Information</Label>
                    <Input
                      id="tagInfo"
                      value={formData.tagInfo}
                      onChange={(e) => handleInputChange('tagInfo', e.target.value)}
                      placeholder="What information is on the tags?"
                    />
                  </div>
                )}
              </div>
              
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold mb-4">Location Information</h4>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="lastSeenLocation">Last Seen Location *</Label>
                    <Input
                      id="lastSeenLocation"
                      value={formData.lastSeenLocation}
                      onChange={(e) => handleInputChange('lastSeenLocation', e.target.value)}
                      placeholder="Where was your pet last seen?"
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
                    <Label htmlFor="usualHangouts">Usual Hangouts</Label>
                    <Textarea
                      id="usualHangouts"
                      value={formData.usualHangouts}
                      onChange={(e) => handleInputChange('usualHangouts', e.target.value)}
                      placeholder="Places your pet likes to go (parks, neighbors' yards, etc.)"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold mb-4">Owner Contact Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ownerName">Your Name *</Label>
                    <Input
                      id="ownerName"
                      value={formData.ownerName}
                      onChange={(e) => handleInputChange('ownerName', e.target.value)}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="ownerPhone">Phone Number</Label>
                    <Input
                      id="ownerPhone"
                      value={formData.ownerPhone}
                      onChange={(e) => handleInputChange('ownerPhone', e.target.value)}
                      placeholder="Your phone number"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="ownerEmail">Email</Label>
                    <Input
                      id="ownerEmail"
                      type="email"
                      value={formData.ownerEmail}
                      onChange={(e) => handleInputChange('ownerEmail', e.target.value)}
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
                  <Label htmlFor="circumstances">Circumstances of Disappearance</Label>
                  <Textarea
                    id="circumstances"
                    value={formData.circumstances}
                    onChange={(e) => handleInputChange('circumstances', e.target.value)}
                    placeholder="How did your pet go missing? (escaped yard, ran away during walk, etc.)"
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="specialNeeds">Special Needs/Medical Conditions</Label>
                  <Textarea
                    id="specialNeeds"
                    value={formData.specialNeeds}
                    onChange={(e) => handleInputChange('specialNeeds', e.target.value)}
                    placeholder="Any medical conditions, medications, or special needs"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="reward">Reward Offered</Label>
                  <Input
                    id="reward"
                    value={formData.reward}
                    onChange={(e) => handleInputChange('reward', e.target.value)}
                    placeholder="Amount or description of reward (optional)"
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
                  Upload recent photos of your pet. Multiple angles are helpful.
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
                  className="bg-blue-600 hover:bg-blue-700"
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
                    className="bg-blue-600 hover:bg-blue-700"
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

export default MissingPetForm;

