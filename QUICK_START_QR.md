# Quick Start Guide - Sales Agent QR Codes

## ⚡ 5-Minute Setup

### 1. Update Agent Data (2 min)
Open `/src/data/agents.ts` and edit the agent information:

```typescript
{
  id: "agent-1",  // Keep this as-is
  name: "Real Agent Name",  // ← Update
  title: "Real Title",  // ← Update
  email: "real@email.com",  // ← Update
  phone: "+52 55 1234 5678",  // ← Update (with country code)
  photo: "/agents/agent-photo.jpg",  // ← Update filename
  bio: "Real bio text"  // ← Update
}
```

### 2. Add Photos (1 min)
- Put agent photos in `/public/agents/`
- Name them to match what's in `agents.ts`
- 400x400px JPG or PNG works best

### 3. Set Base URL (30 sec)
Create `.env.local` in project root:
```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Test (1 min)
```bash
npm run dev
```
Visit: `http://localhost:3000/agent?id=agent-1`

### 5. Generate QR Codes (30 sec)
- Go to: `http://localhost:3000/admin`
- Copy each agent's URL
- Paste into [qr-code-generator.com](https://www.qr-code-generator.com/)
- Download high-res QR codes

## 📍 Key URLs

| Page | URL | Purpose |
|------|-----|---------|
| Agent Page | `/agent?id=agent-1` | Customer sees this after scanning |
| Admin Page | `/admin` | Your page to get URLs for QR codes |

## 🎨 Quick Customization

### Change Brand Colors
In `/src/app/agent/page.tsx`, find and replace:
- `blue-600` → your primary color
- `blue-700` → your darker shade

### Add Social Media
In `/src/data/agents.ts`:
```typescript
export interface SalesAgent {
  // ... existing fields
  whatsapp?: string;  // Add this
  instagram?: string;  // Add this
}
```

Then update each agent with their social handles.

## 🚀 Production Deploy

Before printing business cards:

1. **Set production URL** in Vercel/hosting:
   ```
   NEXT_PUBLIC_BASE_URL=https://rhinoautoglass.mx
   ```

2. **Test all URLs** work in production

3. **Generate final QR codes** with production URLs

4. **Print test cards** and scan them

5. **Print final batch**

## 💡 Pro Tips

✅ **DO:**
- Use high-res QR codes (300+ DPI)
- Test QR codes before bulk printing
- Leave white space around QR codes
- Use agent photos with professional quality

❌ **DON'T:**
- Use tiny QR codes (min 1.5cm x 1.5cm)
- Forget to test on real phones
- Use low-quality photos
- Skip the production URL test

## 🆘 Common Issues

**QR doesn't scan:**
- Make it bigger
- Check contrast (black on white is best)
- Print quality too low

**Page shows "Agent not found":**
- Check agent ID matches in `agents.ts`
- Verify URL is correct

**Photo doesn't show:**
- File must be in `/public/agents/`
- Filename must match exactly (case-sensitive)
- Fallback avatar will show if missing

## 📞 Need Help?

Read the full documentation: `SALES_AGENT_QR_FEATURE.md`

---

**Ready to go? Run:** `npm run dev` **and visit** `/admin`
