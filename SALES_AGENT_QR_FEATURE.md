# Sales Agent QR Code Feature

This feature allows you to create QR codes for your sales agents that link to personalized landing pages with their contact information.

## 📁 Files Created

### Data Layer
- **`/src/data/agents.ts`** - Contains all sales agent data and helper functions

### Pages
- **`/src/app/agent/page.tsx`** - Main agent landing page (accessed via QR code)
- **`/src/app/admin/page.tsx`** - Admin page to view all agent URLs for QR generation

### Assets
- **`/public/agents/`** - Directory for agent photos

## 🚀 How It Works

### 1. Agent Data Structure
Each agent has:
- `id`: Unique identifier (e.g., "agent-1")
- `name`: Full name
- `title`: Job title
- `email`: Contact email
- `phone`: Contact phone
- `photo`: Path to photo (in `/public/agents/`)
- `bio`: Short biography

### 2. URL Format
Agents are accessed via: `yoursite.com/agent?id=agent-1`

### 3. QR Code Flow
1. User scans QR code on business card
2. QR code contains URL: `yoursite.com/agent?id=agent-1`
3. User is taken to the agent's landing page
4. User sees agent info and can call/email/WhatsApp

## 📝 Setup Instructions

### Step 1: Update Agent Information
Edit `/src/data/agents.ts` and update the agent objects with real information:

```typescript
{
  id: "agent-1",
  name: "Your Agent Name",
  title: "Sales Position",
  email: "agent@rhinoautoglass.mx",
  phone: "+52 55 1234 5678",
  photo: "/agents/your-agent.jpg",
  bio: "Your agent's bio here"
}
```

### Step 2: Add Agent Photos
1. Take professional headshots (400x400px recommended)
2. Save them in `/public/agents/` with descriptive names
3. Update the `photo` path in `/src/data/agents.ts`

**Note:** If photos are missing, the system automatically generates a placeholder with the agent's initials.

### Step 3: Set Your Base URL
In your `.env.local` file, add:
```
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

For development:
```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Step 4: Generate QR Codes
1. Start your dev server: `npm run dev`
2. Visit: `http://localhost:3000/admin`
3. Copy each agent's URL
4. Use an external QR code generator:
   - [QR Code Generator](https://www.qr-code-generator.com/)
   - [QR Code Monkey](https://www.qrcode-monkey.com/)
   - [QRCode.io](https://qrcode.io/)
5. Generate high-resolution QR codes (300 DPI minimum)
6. Download and add to business card designs

### Step 5: Test Everything
1. Scan each QR code with your phone
2. Verify the landing page loads correctly
3. Test the phone call link
4. Test the email link
5. Test the WhatsApp link

## 🎨 Customization

### Changing Colors
The landing page uses Tailwind classes. Key color variables:
- Primary: `blue-600`, `blue-700`
- Success: `green-600`
- Background: `blue-50`, `gray-50`

Update colors in `/src/app/agent/page.tsx`

### Adding More Fields
To add fields (e.g., LinkedIn, Instagram):

1. Update the interface in `/src/data/agents.ts`:
```typescript
export interface SalesAgent {
  // ... existing fields
  linkedin?: string;
  instagram?: string;
}
```

2. Update each agent object with the new data

3. Add new contact buttons in `/src/app/agent/page.tsx`

### Changing Layout
The responsive layout is in `/src/app/agent/page.tsx`. It uses:
- Mobile-first approach
- Flexbox for layout
- Gradient backgrounds
- Rounded corners and shadows

## 📊 Analytics (Future Enhancement)

To add analytics tracking when someone scans a QR code:

### Option 1: Google Analytics
```typescript
// In /src/app/agent/page.tsx
useEffect(() => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'qr_scan', {
      agent_id: agent.id,
      agent_name: agent.name
    });
  }
}, [agent]);
```

### Option 2: Vercel Analytics
Already available if you're using Vercel hosting - check your dashboard.

### Option 3: Custom API Endpoint
Create `/src/app/api/track/route.ts`:
```typescript
export async function POST(request: Request) {
  const { agentId } = await request.json();
  // Log to your database
  return Response.json({ success: true });
}
```

## 🔧 Maintenance

### Adding New Agents
1. Open `/src/data/agents.ts`
2. Add a new object to the `salesAgents` array
3. Add their photo to `/public/agents/`
4. Generate new QR code from `/admin` page

### Removing Agents
1. Remove from `salesAgents` array in `/src/data/agents.ts`
2. Delete their photo from `/public/agents/`

### Updating Agent Info
Simply edit the object in `/src/data/agents.ts` - changes are immediate.

## 🌐 Production Checklist

Before going live:

- [ ] Update all agent information with real data
- [ ] Add professional photos for all agents
- [ ] Set `NEXT_PUBLIC_BASE_URL` in production environment
- [ ] Test all QR codes
- [ ] Verify WhatsApp links work correctly
- [ ] Check responsive design on various devices
- [ ] Set up analytics (optional)
- [ ] Print test business cards

## 🐛 Troubleshooting

### QR Code doesn't work
- Check the URL format is correct
- Verify `NEXT_PUBLIC_BASE_URL` is set
- Test the URL in a browser first

### Photo doesn't load
- Verify the file exists in `/public/agents/`
- Check the filename matches exactly (case-sensitive)
- Confirm the photo format is JPG or PNG
- The fallback avatar will show if photo is missing

### WhatsApp link doesn't work
- Ensure phone number has country code
- Remove all spaces and special characters from the phone in the WhatsApp URL
- Format: `https://wa.me/5255123456789`

## 📱 Mobile Optimization

The landing page is fully responsive and optimized for:
- iOS Safari
- Android Chrome
- Various screen sizes from 320px to 1920px

Key mobile features:
- Touch-friendly buttons (48px minimum height)
- Readable font sizes (16px minimum)
- Optimized image loading
- Fast page load times

## 🎯 Business Card Design Tips

When designing business cards with QR codes:

1. **QR Code Size**: Minimum 1.5cm x 1.5cm (0.6" x 0.6")
2. **Quiet Zone**: Leave white space around the QR code
3. **Contrast**: Use high contrast (black on white works best)
4. **Testing**: Test print samples before bulk printing
5. **Position**: Place QR code on the back of the card
6. **Call to Action**: Add text like "Escanea para mi contacto"

## 🔐 Security Notes

- No sensitive data is stored in the QR codes
- Agent IDs are simple identifiers (agent-1, agent-2, etc.)
- Consider adding rate limiting if you experience spam
- Monitor usage through analytics

## 📞 Support

For questions or issues:
1. Check this README first
2. Review the code comments in each file
3. Test in development environment before deploying

---

**Last Updated**: December 2024  
**Version**: 1.0.0
