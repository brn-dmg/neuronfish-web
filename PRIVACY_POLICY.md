# Privacy Policy for Dikkha AI

**Last Updated:** August 28, 2026

---

## Important Disclaimer

**Dikkha AI is an independent educational app and is NOT affiliated with, authorized by, endorsed by, or in any way officially connected to the National Curriculum and Textbook Board (NCTB) or the Government of Bangladesh.**

**দিক্ষা এআই একটি স্বাধীন শিক্ষামূলক অ্যাপ এবং এটি জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (এনসিটিবি) বা বাংলাদেশ সরকারের সাথে কোনোভাবেই অনুমোদিত বা আনুষ্ঠানিকভাবে সংযুক্ত নয়।**

**Official Source of Textbooks:**
- NCTB Official Website: https://nctb.gov.bd/
- NCTB Textbooks Page: https://nctb.gov.bd/pages/static-pages/695b99afc4774958d7b70612

The educational content in this app is based on publicly available NCTB textbooks. This app serves as a convenient study companion and reader.

---

## Introduction

Dikkha AI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application "Dikkha AI" (the "App"). 

Please read this Privacy Policy carefully. By using our App, you agree to the collection and use of information in accordance with this policy.

---

## 1. Information We Collect

### 1.1 Personal Information

We collect the following personal information when you register and use our App:

- **Phone Number**: Required for account creation and authentication via SMS verification
- **Name**: Your display name as provided during profile creation
- **Educational Information**: 
  - Grade (Class 9 or Class 10)
  - Group (Science, Commerce, Humanities, or Other)
  - Board (Your education board name, e.g., Dhaka, Chittagong)
- **Profile Picture**: Optional profile photo that you may upload

### 1.2 Chat and Communication Data

When you use our AI chat features, we collect:

- **Chat Messages**: All text messages you send to the AI assistant
- **Selected Text**: Text you select from educational books for AI explanations
- **Images**: Photos you upload for AI analysis (optional)
- **Voice Recordings**: Audio recordings when using speech-to-text features (processed locally and not stored)
- **Chat Sessions**: Conversation history organized by subject and topic
- **Chat Reports**: Reports you submit about AI responses (including the reported message and your feedback)

### 1.3 Usage Data

We automatically collect certain information about how you use the App:

- **Reading Progress**: Which chapters and subjects you've accessed
- **Study Materials**: Flashcards and quizzes you create or access
- **App Usage**: Features you use, timestamps, and session duration
- **Device Information**: Device model, operating system version, app version

### 1.4 Technical Data

- **Device ID**: Unique identifier for your device
- **IP Address**: Your device's IP address (automatically collected by our servers)
- **Log Data**: Error logs and diagnostic information for app improvement

---

## 2. How We Use Your Information

We use the collected information for the following purposes:

### 2.1 Core Functionality

- **Account Management**: To create and manage your user account
- **Authentication**: To verify your identity via phone number
- **Personalization**: To customize the learning experience based on your grade, group, and board
- **AI Chat Services**: To provide educational assistance and answer your questions
- **Content Delivery**: To serve relevant educational content (books, chapters)

### 2.2 Service Improvement

- **Quality Assurance**: To review and improve AI responses based on your reports
- **Bug Fixes**: To identify and resolve technical issues
- **Analytics**: To understand app usage patterns and improve features (aggregated and anonymized)

### 2.3 Communication

- **User Support**: To respond to your inquiries and provide customer support
- **Service Notifications**: To notify you about important updates or changes to the service

---

## 3. How We Share Your Information

We do not sell your personal information. We share your information only in the following circumstances:

### 3.1 Service Providers

We share your information with trusted third-party service providers who assist us in operating the App:

- **Dikkha Backend API** (GCP Cloud Run):
  - We use our own backend service for phone-based OTP authentication, user profile management, chat sessions, flashcards, and AI-powered responses
  - This service is hosted on Google Cloud Platform (Asia-Southeast1)
  - Your chat messages are processed to generate AI responses and stored for conversation context
  - Authentication is handled via JWT (JSON Web Tokens) issued by our backend after phone verification

- **Google Cloud Platform**:
  - Our backend infrastructure and content storage are hosted on GCP
  - Google Cloud's privacy notice: https://cloud.google.com/terms/cloud-privacy-notice

- **Google Fonts**:
  - We use Google Fonts for UI typography
  - Google may collect certain information as described in their privacy policy: https://policies.google.com/privacy

### 3.2 Legal Requirements

We may disclose your information if required by law or in response to valid requests by public authorities (e.g., a court or government agency).

### 3.3 Business Transfers

In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.

### 3.4 With Your Consent

We may share your information with third parties when you explicitly consent to such sharing.

---

## 4. Data Storage and Security

### 4.1 Storage Locations

- **Local Storage**: Some data (reading progress, cached content, quizzes, flashcards) is stored locally on your device using secure local storage (Hive database). Authentication tokens are stored in encrypted device storage (Android Keystore-backed secure storage).
- **Cloud Storage**: Your profile, chat conversations, chat sessions, and reports are stored securely on our backend servers hosted on Google Cloud Platform (Asia-Southeast1)
- **Backend Storage**: Chat messages, conversation context, flashcards, and infographics are stored on our backend service for persistence and retrieval across sessions

### 4.2 Data Security

We implement appropriate technical and organizational security measures to protect your personal information:

- **Encryption**: Data transmitted between your device and our servers is encrypted using HTTPS/TLS
- **Authentication**: Access to your account is protected by phone number OTP verification and JWT-based session tokens
- **Access Controls**: All API endpoints require authenticated JWT tokens; your data is isolated and accessible only through your authenticated session
- **Secure Storage**: Cloud data is stored on secure Google Cloud Platform servers with industry-standard security measures. On-device authentication tokens are stored in Android Keystore-backed encrypted storage

However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.

### 4.3 Data Retention

- **Account Data**: Retained until you delete your account
- **Chat Conversations**: Retained for 1 year, then archived or deleted upon request
- **Chat Reports**: Retained for 2 years for quality improvement purposes
- **Usage Analytics**: Aggregated data retained for 90 days
- **Local Data**: Stored on your device until you delete the app or clear app data

---

## 5. Your Rights and Choices

### 5.1 Access and Correction

You can access and update your personal information at any time through the Profile section in the App.

### 5.2 Data Deletion

You can delete your account and all associated data at any time:

- **In-App**: Go to Profile → Delete Account
- **What Gets Deleted**: 
  - Your user profile
  - All chat conversations and messages
  - All chat reports
  - Your account is permanently deleted from our systems
  - Local app data is cleared from your device

### 5.3 Data Portability

You can request a copy of your data by contacting us at the email address provided below.

### 5.4 Opt-Out Options

- **Profile Picture**: You can choose not to upload a profile picture
- **Voice Input**: You can choose not to use speech-to-text features
- **Image Uploads**: You can choose not to upload images in chat

---

## 6. Children's Privacy

Our App is designed for students in Class 9 and Class 10 (typically ages 14-16). We do not knowingly collect personal information from children under 13 years of age.

If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.

---

## 7. Permissions We Request

Our App requests the following permissions on Android:

- **Internet & Network State**: Required to connect to our servers and sync data
- **Record Audio** (Microphone): Required for speech-to-text features (only used when you activate voice input)

You can revoke these permissions at any time through your device settings, but this may limit app functionality.

---

## 8. Third-Party Services

Our App uses the following third-party services that have their own privacy policies:

| Service | Purpose | Privacy Policy |
|---------|---------|----------------|
| **Google Cloud Platform** | Backend API Hosting & Content Storage | https://cloud.google.com/terms/cloud-privacy-notice |
| **Google Fonts** | UI Typography | https://policies.google.com/privacy |
| **Reve Systems** | SMS OTP Delivery | https://www.revesms.com/privacy-policy/ |

We encourage you to review the privacy policies of these third-party services.

---

## 9. International Data Transfers

Your information may be transferred to and processed in countries other than your country of residence. Our servers are located in:
- **Google Cloud Run (Asia-Southeast1)**: For backend API, authentication, and AI services
- **Google Cloud Storage (Asia-Southeast1)**: For educational content hosting

These countries may have data protection laws that differ from those in your country. By using our App, you consent to the transfer of your information to these locations.

---

## 10. Changes to This Privacy Policy

We may update this Privacy Policy from time to time. We will notify you of any changes by:

- Posting the new Privacy Policy in the App
- Updating the "Last Updated" date at the top of this policy
- Sending you a notification (if we have your contact information)

You are advised to review this Privacy Policy periodically for any changes. Changes are effective when posted in the App.

---

## 11. Data Controller Information

**App Name:** Dikkha AI  
**Developer:** NeuronFish, Inc. (a Delaware C-Corporation)  
**Contact Email:** risad@neuronfish.dev  
**Registered Address:** 131 Continental Dr Ste 305, Newark, DE 19713, United States  
**Team Location:** Dhaka, Bangladesh

---

## 12. Contact Us

If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:

**Email:** risad@neuronfish.dev  
**Subject Line:** Privacy Policy Inquiry

We will respond to your inquiry within 30 days.

---

## 13. Consent

By using Dikkha AI, you consent to our Privacy Policy and agree to its terms.

If you do not agree with this Privacy Policy, please do not use our App.

---

## 14. Additional Information for Bangladesh Users

If you are located in Bangladesh, you have additional rights under applicable data protection laws. We are committed to complying with local data protection regulations and will process your data in accordance with applicable laws.

---

**END OF PRIVACY POLICY**
