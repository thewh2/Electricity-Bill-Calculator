# Electricity Bill Calculator

A simple and fair way to split electricity bills for shared rental homes in Nepal. Perfect for roommates who want to calculate their individual share of the electricity bill based on actual usage!

## 🎯 What is this project?

This web application helps you:
- Calculate individual electricity bill shares fairly
- Keep track of bill history
- Generate and download PDF receipts
- No complicated calculations - just enter the numbers and we handle the rest!

## 🚀 Quick Start

### Prerequisites
You need to have Node.js installed on your computer. [Get Node.js here](https://nodejs.org/)

### Installation

1. Clone this repository:
```sh
git clone https://github.com/thewh2/Electricity-Bill-Calculator.git
cd Electricity-Bill-Calculator
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

4. Open your browser and visit `http://localhost:8080` or if any other port (e.g. 8081) if 8080 is already in use.

## 📖 How to Use

1. **Enter Bill Details**: Input the total bill amount, meter reading, and number of people sharing
2. **Add Individual Usage**: Enter usage details for each person
3. **Get Results**: The calculator shows how much each person needs to pay
4. **Save or Download**: Save your bill history or download as PDF

## 🛠️ Technologies Used

- **Vite** - Super fast build tool
- **React** - UI library
- **TypeScript** - For type-safe code
- **Tailwind CSS** - For styling
- **shadcn/ui** - Beautiful UI components
- **Vitest** - For testing

## 📁 Project Structure

```
src/
├── components/       # React components
│   ├── BillForm.tsx       # Input form
│   ├── BillResults.tsx    # Results display
│   ├── BillHistory.tsx    # Saved bills
│   └── ui/               # UI components from shadcn
├── pages/           # Page components
├── utils/           # Helper functions
│   ├── calculateBill.ts
│   └── generatePDF.ts
├── types/           # TypeScript types
└── hooks/           # Custom React hooks
```

## 🧪 Testing

Run tests with:
```sh
npm run test
```

## 🔨 Building for Production

Create a production build:
```sh
npm run build
```

Preview the build:
```sh
npm run preview
```

## 📱 Features

- ✅ Fair bill splitting algorithm
- ✅ Bill history tracking
- ✅ PDF download support
- ✅ Mobile-friendly design
- ✅ Responsive UI for all devices

## 🐛 Found a Bug?

If you found something that doesn't work as expected, please create an issue:

1. Go to the [Issues](https://github.com/thewh2/Electricity-Bill-Calculator/issues) tab
2. Click "New Issue"
3. Describe what happened and what you expected
4. Include screenshots if possible

## ✨ Want a New Feature?

Have an idea to make this better? We'd love to hear it!

1. Go to [Issues](https://github.com/thewh2/Electricity-Bill-Calculator/issues)
2. Click "New Issue"
3. Tell us your idea - what feature would help you and why
4. Discuss with us and we'll work on it together

## 🤝 How to Contribute

Want to help improve this project? Great!

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Test your changes (`npm run test`)
5. Commit your changes (`git commit -m 'Add some feature'`)
6. Push to your branch (`git push origin feature/your-feature`)
7. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License - feel free to use it however you like!

## 💬 Questions or Need Help?

- Check existing [issues](https://github.com/thewh2/Electricity-Bill-Calculator/issues)
- Create a new issue with your question
- We'll get back to you as soon as we can!

---

Made with ❤️ for fair bill sharing by [**TheWH2**](https://thewh2.netlify.app/)
