export interface FAQItem {
  id: string;
  question: string;
  answer?: string;
}

export interface FAQCategory {
  id: string;
  title: string;
  totalQuestions: number;
  questions: FAQItem[];
}

export const faqCategories: FAQCategory[] = [
  {
    id: 'shipping',
    title: 'Shipping, Order Tracking & Delivery',
    totalQuestions: 12,
    questions: [
      {
        id: 'shipping-1',
        question: 'Are there any shipping charges applicable to my order?',
        answer: 'We offer FREE shipping on all orders across India with no minimum purchase requirement. For international orders, shipping charges vary based on the destination country and will be calculated at checkout.'
      },
      {
        id: 'shipping-2',
        question: 'How much time does it take to dispatch my order?',
        answer: 'Standard jewelry orders are typically dispatched within 1-2 business days. Personalized or custom jewelry may take 5-7 business days for production before dispatch. You will receive a dispatch notification via email and SMS once your order ships.'
      },
      {
        id: 'shipping-3',
        question: 'How much time does it take to deliver the order?',
        answer: 'Delivery timelines vary by location: Metro cities: 2-3 business days, Other cities: 3-5 business days, Remote areas: 5-7 business days. International orders typically take 7-14 business days depending on the destination.'
      },
      {
        id: 'shipping-4',
        question: 'How can I track my order?',
        answer: 'Once your order is dispatched, you will receive a tracking number via email and SMS. You can track your order by logging into your DIVA account and visiting the "My Orders" section, or by clicking the tracking link in your dispatch notification email.'
      },
      {
        id: 'shipping-5',
        question: 'Can I change my delivery address after placing the order?',
        answer: 'Yes, you can change the delivery address before the order is dispatched. Please contact our customer support immediately at support@diva.com or call us. Once the order is dispatched, address changes may not be possible.'
      },
      {
        id: 'shipping-6',
        question: 'What should I do if my order is delayed?',
        answer: 'If your order is delayed beyond the expected delivery date, please check your tracking status first. If there are no updates, contact our customer support team with your order number. We will investigate with our logistics partner and provide you with an update within 24 hours.'
      },
      {
        id: 'shipping-7',
        question: 'Do you offer same-day delivery?',
        answer: 'Currently, we do not offer same-day delivery. However, we provide express shipping options for select metro cities where orders placed before 12 PM can be delivered the next business day. This service is subject to availability and product type.'
      },
      {
        id: 'shipping-8',
        question: 'Can I schedule a specific delivery date?',
        answer: 'While we cannot guarantee delivery on a specific date, you can add delivery instructions in the notes section during checkout. For time-sensitive occasions, we recommend placing your order at least 7-10 days in advance.'
      },
      {
        id: 'shipping-9',
        question: 'What happens if I am not available to receive my order?',
        answer: 'Our delivery partner will attempt delivery up to 3 times. If you are unavailable, they will leave a notification with instructions. You can reschedule delivery or choose to pick up from the nearest courier office. Ensure someone is available to receive and sign for the package.'
      },
      {
        id: 'shipping-10',
        question: 'Is my package insured during shipping?',
        answer: 'Yes, all DIVA jewelry orders are fully insured during transit at no additional cost to you. In the rare event of loss or damage during shipping, we will either replace the item or provide a full refund.'
      },
      {
        id: 'shipping-11',
        question: 'How is my jewelry packaged for delivery?',
        answer: 'All jewelry is carefully packaged in premium DIVA boxes with protective cushioning. Each piece is wrapped individually to prevent scratches or damage. The package is then sealed and sent in tamper-proof packaging to ensure it reaches you in perfect condition.'
      },
      {
        id: 'shipping-12',
        question: 'Can I pick up my order from a DIVA store instead of delivery?',
        answer: 'Yes, we offer in-store pickup at select DIVA locations. Choose the "Store Pickup" option during checkout and select your preferred store. You will receive a notification when your order is ready for collection, typically within 2-3 business days.'
      }
    ]
  },
  {
    id: 'returns',
    title: 'Return, Replacement & Exchange',
    totalQuestions: 9,
    questions: [
      {
        id: 'returns-1',
        question: 'What is your No Questions Asked return policy?',
        answer: 'We offer a 30-day No Questions Asked return policy on most products. If you are not completely satisfied with your purchase, you can return it within 30 days of delivery for a full refund or exchange. The product must be unused, in original condition with all tags and packaging intact.'
      },
      {
        id: 'returns-2',
        question: "I didn't like the product. How can I return my order?",
        answer: 'To initiate a return: 1) Log into your DIVA account and go to "My Orders", 2) Select the order you want to return and click "Return Item", 3) Choose your reason and preferred refund method, 4) Schedule a free pickup or drop off at the nearest DIVA store. You will receive a confirmation email once the return is processed.'
      },
      {
        id: 'returns-3',
        question: "Can I exchange the product if I don't like it with some other product?",
        answer: 'Yes, you can exchange your product for any other item on our website within 30 days of delivery. Simply initiate a return and select "Exchange" as your preferred option. Choose the new product you want, and we will arrange the exchange at no additional shipping cost.'
      },
      {
        id: 'returns-4',
        question: 'How long do I have to return or exchange an item?',
        answer: 'You have 30 days from the date of delivery to return or exchange your purchase. For personalized or customized jewelry, returns are only accepted if there is a manufacturing defect or error in personalization.'
      },
      {
        id: 'returns-5',
        question: 'What is the condition required for returns?',
        answer: 'Products must be returned in their original condition: unworn, unused, with all original tags attached, in the original packaging with the authenticity certificate and any accessories included. Items showing signs of wear, damage, or alteration cannot be accepted for return.'
      },
      {
        id: 'returns-6',
        question: 'When will I receive my refund?',
        answer: 'Once we receive and inspect your returned item (typically 2-3 business days after pickup), the refund will be processed within 5-7 business days. The amount will be credited to your original payment method. For prepaid orders, refunds go to the original payment source. For COD orders, you can choose bank transfer or DIVA Wallet credit.'
      },
      {
        id: 'returns-7',
        question: 'Can I return personalized jewelry?',
        answer: 'Personalized or customized jewelry cannot be returned unless there is a manufacturing defect or an error in the personalization that was our fault. Please review all personalization details carefully before placing your order, as these items are made specifically for you.'
      },
      {
        id: 'returns-8',
        question: 'Who pays for return shipping?',
        answer: 'DIVA covers all return shipping costs for domestic returns. We will arrange a free pickup from your location at your convenience. For international returns, return shipping charges may apply depending on the return reason and destination country.'
      },
      {
        id: 'returns-9',
        question: 'What if I received a damaged or defective product?',
        answer: 'We sincerely apologize if you received a damaged or defective product. Please contact our customer support within 48 hours of delivery with photos of the damage. We will arrange for an immediate replacement or full refund at no cost to you, with free return pickup.'
      }
    ]
  },
  {
    id: 'wallet',
    title: 'Wallet & Coins',
    totalQuestions: 2,
    questions: [
      {
        id: 'wallet-1',
        question: 'Can I pay for my entire order from DIVA Wallet?',
        answer: 'Yes, you can use your DIVA Wallet balance to pay for your entire order. However, if your wallet balance is insufficient, you can combine it with other payment methods like credit/debit card, UPI, or net banking to complete the payment. Wallet funds never expire and can be used for any future purchases.'
      },
      {
        id: 'wallet-2',
        question: 'Can I pay for my entire order using DIVA Coins?',
        answer: 'DIVA Coins can be used to get discounts on your orders, but they cannot cover the entire order value. You can redeem up to 50% of your order value using DIVA Coins. The remaining amount must be paid using other payment methods. Check your account to see your available DIVA Coins balance and their rupee equivalent.'
      }
    ]
  },
  {
    id: 'personalized',
    title: 'Personalised Jewelry',
    totalQuestions: 5,
    questions: [
      {
        id: 'personalized-1',
        question: 'What Is Personalised Jewelry?',
        answer: 'Personalized jewelry is custom-made pieces that feature your chosen engravings, names, initials, dates, or messages. We offer various personalization options including name necklaces, engraved bracelets, initial pendants, and custom-designed rings. Each piece is handcrafted specifically for you, making it a unique and meaningful accessory or gift.'
      },
      {
        id: 'personalized-2',
        question: 'How much time will it take to deliver my personal jewelry order?',
        answer: 'Personalized jewelry orders typically take 7-10 business days for production and delivery. This includes 5-7 days for crafting your custom piece and 2-3 days for shipping. For complex designs or during peak seasons, it may take up to 14 business days. You will receive regular updates on your order status via email and SMS.'
      },
      {
        id: 'personalized-3',
        question: 'Why do Personalized Jewellery orders take longer to deliver?',
        answer: 'Each personalized piece is individually handcrafted by our skilled artisans according to your specifications. The process includes design verification, metal preparation, engraving or customization, quality checking, and careful finishing. This meticulous attention to detail ensures you receive a perfect, high-quality piece that is uniquely yours.'
      },
      {
        id: 'personalized-4',
        question: 'Can I return or exchange personalized jewelry?',
        answer: 'Due to the custom nature of personalized jewelry, these items cannot be returned or exchanged unless there is a manufacturing defect or an error in the personalization that was our fault. Please carefully review all personalization details in your order confirmation before we begin production. Once confirmed, changes cannot be made.'
      },
      {
        id: 'personalized-5',
        question: 'What personalization options do you offer?',
        answer: 'We offer various personalization options including: Custom name engraving, Initial monograms, Special dates, Coordinates, Fingerprints, Handwriting replication, Custom messages (up to 20 characters), Choice of fonts and styles. Available options vary by product. Check the product page for specific customization features available for each item.'
      }
    ]
  },
  {
    id: 'warranty',
    title: 'Warranty',
    totalQuestions: 1,
    questions: [
      {
        id: 'warranty-1',
        question: 'When and how can I claim Warranty?',
        answer: 'All DIVA jewelry comes with a 6-month manufacturing warranty from the date of purchase. The warranty covers manufacturing defects such as stone falling, metal breakage, or plating issues under normal use. To claim warranty: 1) Visit your DIVA account and go to "My Orders", 2) Select the order and click "Warranty Claim", 3) Upload photos of the defect, 4) Our team will review and approve eligible claims within 24-48 hours. Warranty does not cover damage from accidents, misuse, or normal wear and tear. Keep your purchase invoice and authenticity certificate for warranty claims.'
      }
    ]
  },
  {
    id: 'coupons',
    title: 'Coupons & Discounts',
    totalQuestions: 3,
    questions: [
      {
        id: 'coupons-1',
        question: 'My Coupon Code is not working, what should I do?',
        answer: 'If your coupon code is not working, please check: 1) The code is entered correctly (case-sensitive), 2) Your order meets the minimum purchase requirement, 3) The code has not expired, 4) The products in your cart are eligible for the offer (some products may be excluded), 5) You have not already used this one-time code. If you have verified all these conditions and the code still does not work, please contact our customer support with the coupon code and order details.'
      },
      {
        id: 'coupons-2',
        question: 'Can I combine multiple Coupon Codes?',
        answer: 'No, only one coupon code can be applied per order. If you have multiple codes, you can use the one that gives you the maximum discount. The system will automatically show you the applicable discount when you enter the code. You can try different codes to see which offers the best value for your specific order.'
      },
      {
        id: 'coupons-3',
        question: 'I forgot to apply coupon code while placing the order? Can I apply it now?',
        answer: 'Unfortunately, coupon codes cannot be applied after an order has been placed. However, if your order has not been dispatched yet, you can cancel it and place a new order with the coupon code applied. Alternatively, contact our customer support immediately, and we will try our best to help, though we cannot guarantee the coupon can be applied retroactively.'
      }
    ]
  },
  {
    id: 'product',
    title: 'Product',
    totalQuestions: 5,
    questions: [
      {
        id: 'product-1',
        question: 'Is DIVA Jewelry made of Pure Silver?',
        answer: 'Yes, our silver jewelry is made from 925 Sterling Silver, which is 92.5% pure silver alloyed with 7.5% other metals (usually copper) for strength and durability. This is the international standard for silver jewelry and is hallmarked for authenticity. Pure silver (99.9%) is too soft for everyday jewelry, so sterling silver provides the perfect balance of purity, beauty, and durability.'
      },
      {
        id: 'product-2',
        question: 'Do you use Natural Diamonds?',
        answer: 'We offer both natural diamonds and lab-grown diamonds in our collections. Natural diamonds are clearly marked and come with authenticity certificates. Lab-grown diamonds are also available and offer the same physical, chemical, and optical properties as natural diamonds at a more accessible price point. Each product page clearly indicates the type of diamond used, and all diamonds are ethically sourced.'
      },
      {
        id: 'product-3',
        question: 'How do I take care of my Silver Jewelry?',
        answer: 'To keep your silver jewelry looking beautiful: 1) Store in a cool, dry place in an airtight bag or jewelry box, 2) Remove before swimming, bathing, or exercising, 3) Avoid contact with perfumes, lotions, and chemicals, 4) Clean regularly with a soft cloth and mild soap, 5) For tarnish removal, use a silver polishing cloth or professional silver cleaner, 6) Keep away from moisture and humidity. With proper care, your DIVA silver jewelry will maintain its shine for years.'
      },
      {
        id: 'product-4',
        question: 'What is the purity of gold jewelry offered?',
        answer: 'We offer gold jewelry in multiple purity levels: 22K Gold (91.6% pure gold) for traditional designs, 18K Gold (75% pure gold) for contemporary pieces, and 14K Gold (58.5% pure gold) for daily wear. Each piece is hallmarked and comes with a purity certificate. The product description clearly mentions the karat purity, and you can filter by gold purity when browsing our collections.'
      },
      {
        id: 'product-5',
        question: 'Do you provide authenticity certificates?',
        answer: 'Yes, every DIVA jewelry purchase comes with an authenticity certificate that includes: Product details and specifications, Metal purity certification, Diamond/gemstone certification (if applicable), Hallmark information, Purchase date and invoice number. This certificate is essential for warranty claims, resale value, and insurance purposes. Please keep it safe along with your purchase invoice.'
      }
    ]
  },
  {
    id: 'account',
    title: 'Profile & Account',
    totalQuestions: 3,
    questions: [
      {
        id: 'account-1',
        question: 'Do I need to create an account to order on Website/App?',
        answer: 'While you can browse our collection without an account, creating an account offers several benefits: Faster checkout process, Order tracking and history, Saved addresses and payment methods, Wishlist functionality, Exclusive member offers and early sale access, DIVA Coins and Wallet features, Easy returns and warranty claims. You can also checkout as a guest if you prefer not to create an account.'
      },
      {
        id: 'account-2',
        question: 'I have forgotten my account password, what should I do?',
        answer: 'To reset your password: 1) Click on "Login" and then "Forgot Password", 2) Enter your registered email address or phone number, 3) You will receive a password reset link via email or OTP via SMS, 4) Click the link or enter the OTP and create a new password, 5) Use your new password to log in. If you do not receive the reset link, check your spam folder or contact customer support for assistance.'
      },
      {
        id: 'account-3',
        question: 'Are my personal details secure?',
        answer: 'Yes, we take your privacy and security very seriously. All personal information is encrypted using industry-standard SSL technology. We never share your data with third parties without your consent. Payment information is processed through secure, PCI-DSS compliant payment gateways and is never stored on our servers. We comply with all data protection regulations. You can read our complete Privacy Policy on our website for detailed information about how we protect your data.'
      }
    ]
  },
  {
    id: 'international',
    title: 'International Shipping',
    totalQuestions: 4,
    questions: [
      {
        id: 'international-1',
        question: 'Which countries do you offer shipping to?',
        answer: 'We currently ship to over 50 countries worldwide including USA, UK, Canada, Australia, UAE, Singapore, and most European countries. Select your country during checkout to see if we ship to your location. We are continuously expanding our international shipping network. If your country is not listed, please contact customer support to inquire about shipping possibilities.'
      },
      {
        id: 'international-2',
        question: 'How much time will it take to deliver the orders?',
        answer: 'International delivery times vary by destination: USA and Canada: 7-10 business days, UK and Europe: 7-12 business days, Australia and New Zealand: 10-14 business days, Middle East and Asia: 5-10 business days. These timelines are estimates and may vary due to customs clearance and local delivery conditions. Express shipping options are available for faster delivery in select countries.'
      },
      {
        id: 'international-3',
        question: "What're the Shipping Charges for International Orders?",
        answer: 'International shipping charges vary based on the destination country, order weight, and shipping method selected. Charges are calculated automatically at checkout based on your delivery address. We offer: Standard International Shipping (7-14 days) and Express International Shipping (3-7 days). For orders above a certain value, we may offer free or discounted international shipping during promotional periods. Check our International Shipping page for current rates and offers.'
      },
      {
        id: 'international-4',
        question: 'Do I have to pay customs or import duties?',
        answer: 'Customs duties and import taxes are the responsibility of the customer and vary by country. These charges are determined by your local customs office based on the declared value of your shipment. DIVA is not responsible for these fees. We recommend checking with your local customs office to understand the potential duties before placing your order. All packages are shipped with proper customs documentation and declared value for smooth clearance.'
      }
    ]
  },
  {
    id: 'stores',
    title: 'Offline Stores',
    totalQuestions: 2,
    questions: [
      {
        id: 'stores-1',
        question: 'Are there any offline stores from where I can purchase DIVA products?',
        answer: 'Yes, DIVA has offline retail stores in major cities across the country where you can view, try, and purchase our jewelry collections in person. Our stores offer the complete DIVA experience with expert consultants to help you find the perfect piece. You can also avail in-store exclusive offers, get professional jewelry cleaning, and access warranty services. Visit our Store Locator page to find the nearest DIVA store to you.'
      },
      {
        id: 'stores-2',
        question: 'Where can I find a list of all DIVA stores?',
        answer: 'You can find our complete store list on the "Store Locator" page on our website. Simply enter your city or pin code to find the nearest stores with addresses, contact numbers, and store hours. You can also get directions via Google Maps integration. Each store page shows the services available at that location, such as customization, repairs, and jewelry consultations. For the most current store information, we recommend checking the website as we regularly open new locations.'
      }
    ]
  },
  {
    id: 'payments',
    title: 'Payments & Refunds',
    totalQuestions: 5,
    questions: [
      {
        id: 'payments-1',
        question: 'How can I pay for my order at DIVA?',
        answer: 'We accept multiple payment methods for your convenience: Credit/Debit Cards (Visa, MasterCard, American Express, RuPay), Net Banking (all major banks), UPI (Google Pay, PhonePe, Paytm, etc.), Digital Wallets (Paytm, Mobikwik, Amazon Pay), DIVA Wallet and Coins, EMI options (for orders above ₹3,000), Cash on Delivery (available for select locations). All transactions are secured with 256-bit SSL encryption for your safety.'
      },
      {
        id: 'payments-2',
        question: "What to do if the amount got deducted but I haven't got the order confirmation?",
        answer: 'Sometimes there may be a delay in receiving order confirmation due to technical issues. Please: 1) Check your email (including spam folder) and SMS for order confirmation, 2) Log into your DIVA account and check "My Orders" section, 3) If your order is not visible within 24 hours, contact customer support with your transaction ID and payment details, 4) Keep your bank transaction screenshot ready. If the order was not placed successfully, the amount will be automatically refunded to your account within 5-7 business days. We will also issue a refund manually if needed.'
      },
      {
        id: 'payments-3',
        question: 'Do you offer EMI option for Payments?',
        answer: 'Yes, we offer No Cost EMI and Standard EMI options on orders above ₹3,000 through major credit and debit cards from partner banks. EMI tenures available: 3, 6, 9, and 12 months. Select the EMI option during checkout to see if your card is eligible. For No Cost EMI, DIVA absorbs the interest cost, so you pay only the product price split across installments. EMI availability and terms vary by bank and card type.'
      },
      {
        id: 'payments-4',
        question: 'Is it safe to use my credit/debit card on your website?',
        answer: 'Absolutely. We use industry-standard security measures to protect your payment information: 256-bit SSL encryption for all transactions, PCI-DSS compliant payment gateways, Secure 3D authentication for card payments, No storage of card details on our servers, Regular security audits and updates. Your card information goes directly to the payment gateway and is never stored or accessible by DIVA. You can shop with complete confidence knowing your financial data is secure.'
      },
      {
        id: 'payments-5',
        question: 'How long does it take to process refunds?',
        answer: 'Refund processing timelines: Step 1: Return inspection and approval (2-3 business days after we receive the item), Step 2: Refund initiation (1-2 business days after approval), Step 3: Credit to your account (5-7 business days depending on your bank). For prepaid orders, refunds go to the original payment method. For Cash on Delivery orders, you can choose between bank transfer or DIVA Wallet credit (instant). You will receive email notifications at each step of the refund process. If you do not see the refund within the stated timeline, please contact your bank or our customer support.'
      }
    ]
  }
];
