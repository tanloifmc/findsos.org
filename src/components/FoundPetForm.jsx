import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  PawPrint, Calendar, MapPin, Phone, Facebook, Mail, Camera, 
  ArrowLeft, Save, Eye, AlertCircle, Heart, Home
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Badge } from '@/components/ui/badge.jsx';

const FoundPetForm = ({ onBack, onSubmit }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    // Pet Information
    petType: '',
    estimatedAge: '',
    gender: '',
    foundDate: '',
    foundTime: '',
    
    // Physical Description
    size: '',
    weight: '',
    color: '',
    markings: '',
    distinguishingFeatures: '',
    
    // Condition & Behavior
    physicalCondition: '',
    temperament: '',
    hasCollar: '',
    collarDescription: '',
    hasTags: '',
    tagInfo: '',
    microchipScanned: '',
    microchipFound: '',
    
    // Location Information
    foundLocation: '',
    foundAddress: '',
    currentLocation: '',
    
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
        return formData.petType && formData.foundDate;
      case 2:
        return formData.size && formData.color;
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
            <CardTitle className="flex items-center text-green-700">
              <Eye className="w-6 h-6 mr-2" />
              Preview Found Pet Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Pet Found</h3>
                <div className="space-y-2">
                  <p><strong>Type:</strong> {formData.petType}</p>
                  <p><strong>Estimated Age:</strong> {formData.estimatedAge}</p>
                  <p><strong>Gender:</strong> {formData.gender}</p>
                  <p><strong>Found Date:</strong> {formData.foundDate} at {formData.foundTime}</p>
                  <p><strong>Size:</strong> {formData.size}</p>
                  <p><strong>Color:</strong> {formData.color}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-3">Identification</h3>
                <div className="space-y-2">
                  <p><strong>Has Collar:</strong> {formData.hasCollar}</p>
                  {formData.hasCollar === 'yes' && (
                    <p><strong>Collar:</strong> {formData.collarDescription}</p>
                  )}
                  <p><strong>Has Tags:</strong> {formData.hasTags}</p>
                  {formData.hasTags === 'yes' && (
                    <p><strong>Tag Info:</strong> {formData.tagInfo}</p>
                  )}
                  <p><strong>Microchip Scanned:</strong> {formData.microchipScanned}</p>
                  {formData.microchipFound === 'yes' && (
                    <p><strong>Microchip Found:</strong> Yes</p>
                  )}
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
              <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
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
            <CardTitle className="flex items-center text-green-700">
              <Home className="w-6 h-6 mr-2" />
              Report Found Pet - Step {currentStep} of 4
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Help a found pet reunite with their family
            </p>
            <div className="flex space-x-2 mt-4">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-2 flex-1 rounded ${
                    step <= currentStep ? 'bg-green-600' : 'bg-gray-200'
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
                  <Label htmlFor="petType">Pet Type *</Label>
                  <Select value={formData.petType} onValueChange={(value) => handleInputChange('petType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="What type of pet did you find?" />
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
                  <Label htmlFor="estimatedAge">Estimated Age</Label>
                  <Input
                    id="estimatedAge"
                    value={formData.estimatedAge}
                    onChange={(e) => handleInputChange('estimatedAge', e.target.value)}
                    placeholder="Estimated age (e.g., young, adult, senior)"
                  />
                </div>
                
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender if known" />
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
                
                <div>
                  <Label htmlFor="physicalCondition">Physical Condition</Label>
                  <Select value={formData.physicalCondition} onValueChange={(value) => handleInputChange('physicalCondition', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="How is the pet's condition?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent - healthy and well-cared for</SelectItem>
                      <SelectItem value="good">Good - appears healthy</SelectItem>
                      <SelectItem value="fair">Fair - some signs of neglect</SelectItem>
                      <SelectItem value="poor">Poor - needs medical attention</SelectItem>
                      <SelectItem value="injured">Injured</SelectItem>
                      <SelectItem value="sick">Appears sick</SelectItem>
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
                  <Label htmlFor="weight">Estimated Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    placeholder="Estimated weight in kg"
                  />
                </div>
                
                <div>
                  <Label htmlFor="color">Primary Color *</Label>
                  <Input
                    id="color"
                    value={formData.color}
                    onChange={(e) => handleInputChange('color', e.target.value)}
                    placeholder="Primary color (e.g., Brown, Black, White)"
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
                  <Label htmlFor="temperament">Temperament</Label>
                  <Select value={formData.temperament} onValueChange={(value) => handleInputChange('temperament', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="How does the pet behave?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="friendly">Friendly and approachable</SelectItem>
                      <SelectItem value="shy">Shy but gentle</SelectItem>
                      <SelectItem value="scared">Scared/fearful</SelectItem>
                      <SelectItem value="aggressive">Aggressive/defensive</SelectItem>
                      <SelectItem value="playful">Playful and energetic</SelectItem>
                      <SelectItem value="calm">Calm and docile</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                      <SelectValue placeholder="Does the pet have a collar?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
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
                      <SelectValue placeholder="Does the pet have ID tags?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {formData.hasTags === 'yes' && (
                  <div>
                    <Label htmlFor="tagInfo">Tag Information</Label>
                    <Textarea
                      id="tagInfo"
                      value={formData.tagInfo}
                      onChange={(e) => handleInputChange('tagInfo', e.target.value)}
                      placeholder="What information is on the tags? (name, phone number, etc.)"
                      rows={2}
                    />
                  </div>
                )}
                
                <div>
                  <Label htmlFor="microchipScanned">Microchip Scanned?</Label>
                  <Select value={formData.microchipScanned} onValueChange={(value) => handleInputChange('microchipScanned', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Have you scanned for a microchip?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes, scanned by vet/shelter</SelectItem>
                      <SelectItem value="no">No, not scanned yet</SelectItem>
                      <SelectItem value="planned">Planning to scan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {formData.microchipScanned === 'yes' && (
                  <div>
                    <Label htmlFor="microchipFound">Microchip Found?</Label>
                    <Select value={formData.microchipFound} onValueChange={(value) => handleInputChange('microchipFound', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Was a microchip found?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes, microchip found</SelectItem>
                        <SelectItem value="no">No microchip found</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold mb-4">Location Information</h4>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="foundLocation">Where Found *</Label>
                    <Input
                      id="foundLocation"
                      value={formData.foundLocation}
                      onChange={(e) => handleInputChange('foundLocation', e.target.value)}
                      placeholder="Where did you find this pet?"
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
                      placeholder="Where is the pet now? (your home, vet, shelter, etc.)"
                    />
                  </div>
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
                    placeholder="How and where did you find this pet? Was it wandering, hiding, etc.?"
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                    placeholder="Any other relevant information about the pet or circumstances"
                    rows={3}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="photos">Photos</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Upload clear photos of the pet. Multiple angles are helpful for identification.
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
                  className="bg-green-600 hover:bg-green-700"
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
                    className="bg-green-600 hover:bg-green-700"
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

export default FoundPetForm;

