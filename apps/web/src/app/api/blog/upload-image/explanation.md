# Image Upload API Route - Detailed Explanation

## Overview

This API route handles uploading images from your client-side component to Sanity's asset storage.

---

## Code Breakdown

### 1. **Route Setup**

```typescript
// app/api/blog/upload-image/route.ts
export async function POST(req: Request) {
```

- This creates a **POST endpoint** at `/api/blog/upload-image`
- Only accepts POST requests (for uploading files)
- `req: Request` - The incoming HTTP request from your frontend

---

### 2. **Extract File from FormData**

```typescript
const formData = await req.formData();
const file = formData.get("file") as File;
```

**What's happening:**

- `req.formData()` - Parses the multipart/form-data from the request
- `formData.get("file")` - Gets the file that was uploaded with the key name "file"
- `as File` - TypeScript type assertion

**Why FormData?**

- HTML file inputs send data as `multipart/form-data`, not JSON
- FormData is the standard way to handle file uploads in web APIs

**Frontend sends it like this:**

```typescript
const formData = new FormData();
formData.append("file", imageFile); // ← The "file" key matches above
fetch("/api/blog/upload-image", {
  method: "POST",
  body: formData, // ← Sent as FormData
});
```

---

### 3. **Validation**

```typescript
if (!file) {
  return NextResponse.json(
    { success: false, error: "No file provided" },
    { status: 400 },
  );
}
```

**What's happening:**

- Checks if a file was actually uploaded
- Returns **400 Bad Request** if missing
- Prevents errors downstream

---

### 4. **Convert File to Buffer**

```typescript
const bytes = await file.arrayBuffer();
const buffer = Buffer.from(bytes);
```

**What's happening:**

1. `file.arrayBuffer()` - Converts the File object to raw binary data (ArrayBuffer)
2. `Buffer.from(bytes)` - Converts ArrayBuffer to Node.js Buffer

**Why this conversion?**

- **File** (browser format) → **ArrayBuffer** (raw binary) → **Buffer** (Node.js format)
- Sanity's `assets.upload()` expects a **Buffer** or **Stream**, not a File object
- This makes the data compatible with Sanity's API

**Analogy:**
Think of it like translating languages:

- File = English
- ArrayBuffer = Universal binary language
- Buffer = Sanity's preferred language

---

### 5. **Upload to Sanity**

```typescript
const asset = await sanityWriteClient.assets.upload("image", buffer, {
  filename: file.name,
  contentType: file.type,
});
```

**What's happening:**

- `sanityWriteClient.assets.upload()` - Sanity's method to upload assets
- **Parameters:**
  1. `'image'` - Type of asset (could also be 'file' for PDFs, etc.)
  2. `buffer` - The actual file data
  3. Options object:
     - `filename: file.name` - Original filename (e.g., "beach.jpg")
     - `contentType: file.type` - MIME type (e.g., "image/jpeg")

**What Sanity does:**

1. Uploads the image to Sanity's CDN
2. Processes it (generates thumbnails, optimizations)
3. Returns an **asset document** with metadata

**Asset object returned:**

```typescript
{
  _id: "image-abc123def456-1920x1080-jpg",  // ← Unique ID
  url: "https://cdn.sanity.io/images/...",  // ← CDN URL
  originalFilename: "beach.jpg",
  size: 245680,
  mimeType: "image/jpeg",
  // ... more metadata
}
```

---

### 6. **Return Success Response**

```typescript
return NextResponse.json({
  success: true,
  assetId: asset._id, // ← Store this in your blog post
  url: asset.url, // ← Use this to display the image
});
```

**What gets sent back to frontend:**

```json
{
  "success": true,
  "assetId": "image-abc123def456-1920x1080-jpg",
  "url": "https://cdn.sanity.io/images/project/dataset/..."
}
```

**Why return both?**

- `assetId` - Reference to link the image to your blog post in Sanity
- `url` - Direct URL to display the image immediately (preview)

---

### 7. **Error Handling**

```typescript
} catch (error) {
  console.error("Error uploading image:", error);
  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  return NextResponse.json(
    { success: false, error: errorMessage },
    { status: 500 }
  );
}
```

**What's happening:**

- Catches any errors during upload
- Logs error to server console for debugging
- Returns **500 Internal Server Error** with error message

---

## Complete Flow Example

### Frontend Component:

```typescript
// 1. User selects image file
<input type="file" onChange={(e) => setImageFile(e.target.files[0])} />

// 2. Upload to Sanity when creating post
const uploadImageToSanity = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/blog/upload-image", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data.assetId; // Returns: "image-abc123..."
};

// 3. Include asset ID in blog post
const postData = {
  title: "My Post",
  mainImage: assetId, // ← Links to uploaded image
};
```

### Sanity Storage:

```
1. Image uploaded → Sanity CDN
2. Asset document created with ID
3. Blog post references asset by ID
4. When querying, Sanity resolves the reference to full URL
```

---

## Why Use an API Route Instead of Direct Upload?

### ✅ **Using API Route (This approach)**

- **Secure**: API token stays on server (never exposed to client)
- **Controlled**: You can add validation, virus scanning, size limits
- **Consistent**: Same upload logic for all users

### ❌ **Direct Client Upload**

- Would require exposing your Sanity write token in browser
- Anyone could inspect network requests and steal your token
- Security risk: Malicious users could upload anything

---

## Key Takeaways

1. **FormData** - Standard way to send files from browser
2. **Buffer Conversion** - Necessary to make browser File compatible with Sanity
3. **Asset ID** - Reference stored in your blog post document
4. **CDN URL** - Public URL for displaying the image
5. **Server-side** - Keeps API tokens secure

---

## In Your Blog Post Document

After upload, your Sanity blog post looks like:

```typescript
{
  _type: "blogPost",
  title: "My Amazing Post",
  mainImage: {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: "image-abc123def456-1920x1080-jpg" // ← The assetId from upload
    }
  }
}
```

When you query it:

```typescript
// Sanity automatically resolves the reference
{
  title: "My Amazing Post",
  mainImage: {
    asset: {
      _id: "image-abc123...",
      url: "https://cdn.sanity.io/images/..." // ← Ready to display!
    }
  }
}
```
