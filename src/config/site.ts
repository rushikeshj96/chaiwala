export const SITE_CONFIG = {
  siteName: 'Chai Time',
  hindiName: 'चाय Time',
  latinSubtitle: 'CHAI WALA',
  tagline: 'एक कप चाय, थोड़ी सी बातें, और थोड़ा सा सुकून.',
  taglineEn: 'A cup of tea, a little conversation, and a moment of peace.',

  // SEO
  seoTitle: 'चाय वाला — एक कप चाय, थोड़ी सी बातें ☕',
  seoDescription: 'चाय वाला — एक डिजिटल चाय की दुकान जहाँ चाय, संगीत और थोड़ी सी यादें साथ मिलती हैं.',
  seoUrl: 'https://chaiwala.in',

  // Visitor counter
  visitorMode: 'demo' as 'demo' | 'supabase', // Change to 'supabase' when backend is ready
  supabaseUrl: '',     // Set when using Supabase
  supabaseAnonKey: '', // Set when using Supabase

  // Chai timer presets (in seconds)
  timerPresets: [
    { label: 'हल्की चाय', labelEn: 'Light Chai', seconds: 150 },    // 2:30
    { label: 'अच्छी चाय', labelEn: 'Standard Chai', seconds: 210 }, // 3:30
    { label: 'कड़क चाय', labelEn: 'Kadak Chai', seconds: 300 },      // 5:00
    { label: 'मालिक वाली', labelEn: 'Boss Chai', seconds: 420 },    // 7:00
  ],
};
