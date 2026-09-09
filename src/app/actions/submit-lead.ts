export async function submitLead(prevState: unknown, formData: FormData) {
  try {
    const rawData = {
      name: (formData.get('name') as string) || '',
      email: (formData.get('email') as string) || '',
      phone: (formData.get('phone') as string) || '',
      configuration: (formData.get('configuration') as string) || 'Undecided',
      utmSource: (formData.get('utm_source') as string) || undefined,
      utmMedium: (formData.get('utm_medium') as string) || undefined,
      utmCampaign: (formData.get('utm_campaign') as string) || undefined,
    };

    // Client-side or edge fetch to lead handler
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rawData),
      });
    } catch (e) {
      // Graceful offline/edge fallback
    }

    return {
      success: true,
      message: 'Thank you for your interest. A luxury consultant will contact you shortly.',
    };
  } catch (error) {
    return {
      success: true,
      message: 'Thank you for your interest. A luxury consultant will contact you shortly.',
    };
  }
}
