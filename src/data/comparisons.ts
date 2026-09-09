export type CompareRow = { label: string; krv: string; competitor: string; krvWins: boolean | 'tie' };

export const COMPARISONS: Record<string, {
  title: string; description: string; h1: string;
  competitor: string; competitorLocation: string;
  rows: CompareRow[];
}> = {
  'k-raheja-vistas-vs-godrej-hillside-mahalunge': {
    title: 'K Raheja Vistas vs Godrej Hillside Mahalunge | Which is Better?',
    description: 'Detailed comparison of K Raheja Vistas Mahalunge vs Godrej Hillside — price, amenities, location, configurations, MahaRERA compliance and investment potential in West Pune.',
    h1: 'K Raheja Vistas vs Godrej Hillside — Complete Comparison 2026',
    competitor: 'Godrej Hillside Mahalunge',
    competitorLocation: 'Mahalunge, Pune',
    rows: [
      { label: 'Land Area', krv: '7.5 Acres', competitor: '5.2 Acres', krvWins: true },
      { label: 'Total Towers', krv: '7 Towers', competitor: '5 Towers', krvWins: true },
      { label: 'Open Space', krv: '75% Open', competitor: '60% Open', krvWins: true },
      { label: 'Private Deck', krv: '✓ Every Home', competitor: 'Selected Units', krvWins: true },
      { label: 'Clubhouse', krv: 'Twin Clubhouses', competitor: 'Single Clubhouse', krvWins: true },
      { label: 'Starting Price', krv: '₹1.10 Cr', competitor: '₹1.25 Cr', krvWins: true },
      { label: 'MahaRERA', krv: 'PR1260002501530', competitor: 'Registered', krvWins: 'tie' },
      { label: 'Developer Track Record', krv: '65+ Years, Pan-India', competitor: '30+ Years, Pan-India', krvWins: true },
      { label: 'Smart Home', krv: '✓ Standard', competitor: 'Premium Add-on', krvWins: true },
      { label: 'Hinjewadi Distance', krv: '4.5 km', competitor: '6 km', krvWins: true },
    ]
  },
  'k-raheja-vistas-vs-rohan-harita-baner': {
    title: 'K Raheja Vistas vs Rohan Harita Baner | Side-by-Side Review',
    description: 'K Raheja Vistas Mahalunge vs Rohan Harita Baner — which luxury project offers better value, amenities, and investment returns in West Pune?',
    h1: 'K Raheja Vistas vs Rohan Harita Baner — Detailed 2026 Comparison',
    competitor: 'Rohan Harita Baner',
    competitorLocation: 'Baner, Pune',
    rows: [
      { label: 'Land Area', krv: '7.5 Acres', competitor: '4.0 Acres', krvWins: true },
      { label: 'Configurations', krv: '2, 3, 4 BHK + Duplex', competitor: '2 & 3 BHK Only', krvWins: true },
      { label: 'Deck Residences', krv: '✓ All Homes', competitor: '✗ Not Available', krvWins: true },
      { label: 'Clubhouse', krv: 'Twin Clubhouses', competitor: 'Single Clubhouse', krvWins: true },
      { label: 'Infinity Pool', krv: 'Temperature Controlled', competitor: 'Standard Pool', krvWins: true },
      { label: 'Starting Price', krv: '₹1.10 Cr', competitor: '₹98 Lakh', krvWins: false },
      { label: 'MahaRERA', krv: 'PR1260002501530', competitor: 'Registered', krvWins: 'tie' },
      { label: 'Possession', krv: 'On Schedule (2026)', competitor: 'On Schedule', krvWins: 'tie' },
      { label: 'Smart Home', krv: '✓ Standard', competitor: '✗ Optional', krvWins: true },
      { label: 'Brand Pedigree', krv: 'K Raheja Corp', competitor: 'Rohan Builders', krvWins: true },
    ]
  },
  'k-raheja-vistas-vs-kolte-patil-baner': {
    title: 'K Raheja Vistas vs Kolte Patil Baner | Investment Comparison 2026',
    description: 'Comparing K Raheja Vistas Mahalunge against Kolte Patil projects in Baner — price per sqft, amenities, ROI, and why K Raheja Vistas delivers more value.',
    h1: 'K Raheja Vistas vs Kolte Patil Baner — Which Offers Better ROI?',
    competitor: 'Kolte Patil Life Republic',
    competitorLocation: 'Wakad-Hinjewadi, Pune',
    rows: [
      { label: 'Micro-Market', krv: 'Baner Annexe / Mahalunge', competitor: 'Marunji / Hinjewadi Ph 2', krvWins: true },
      { label: 'Land Area', krv: '7.5 Acres Integrated', competitor: 'Large Township', krvWins: 'tie' },
      { label: 'Density', krv: 'Low Density (650 Units)', competitor: 'High Density (5000+ Units)', krvWins: true },
      { label: 'Deck Architecture', krv: 'Private Decks on All Units', competitor: 'Standard Balconies', krvWins: true },
      { label: 'Starting Price', krv: '₹1.10 Cr', competitor: '₹85 Lakh', krvWins: false },
      { label: 'Balewadi High Street', krv: '2 km (5 mins)', competitor: '9 km (25 mins)', krvWins: true },
      { label: 'Rental Yield', krv: '4–6% pa', competitor: '3.5–4% pa', krvWins: true },
      { label: 'MahaRERA', krv: 'PR1260002501530', competitor: 'Registered', krvWins: 'tie' },
      { label: 'Hinjewadi Distance', krv: '4.5 km', competitor: '2 km', krvWins: false },
    ]
  },
  'best-luxury-projects-near-hinjewadi': {
    title: 'Best Luxury Projects Near Hinjewadi IT Park 2026 | Top Picks',
    description: 'Looking for luxury homes near Hinjewadi IT Park? Compare the top premium residential projects in West Pune — K Raheja Vistas, Godrej Hillside, Rohan Harita and more.',
    h1: 'Top 5 Luxury Projects Near Hinjewadi IT Park — 2026 Rankings',
    competitor: 'Other Projects Near Hinjewadi',
    competitorLocation: 'West Pune',
    rows: [
      { label: '#1 Pick', krv: 'K Raheja Vistas Mahalunge', competitor: 'Others', krvWins: true },
      { label: 'Distance from Hinjewadi', krv: '4.5 km', competitor: '4–8 km', krvWins: true },
      { label: 'Acres', krv: '7.5 Acres', competitor: '4–6 Acres', krvWins: true },
      { label: 'Private Decks', krv: 'Every Residence', competitor: 'Not Standard', krvWins: true },
      { label: 'Open Spaces', krv: '75%', competitor: '50–65%', krvWins: true },
      { label: 'Configurations', krv: '2–4 BHK + Duplex', competitor: '2–3 BHK', krvWins: true },
      { label: 'Price Entry', krv: '₹1.10 Cr', competitor: '₹98L–₹1.3Cr', krvWins: true },
      { label: 'Appreciation (5yr)', krv: '18% YoY', competitor: '10–14% YoY', krvWins: true },
      { label: 'MahaRERA', krv: 'PR1260002501530', competitor: 'Varies', krvWins: true },
      { label: 'Smart Home', krv: 'Standard', competitor: 'Premium Add-on', krvWins: true },
    ]
  },
};
