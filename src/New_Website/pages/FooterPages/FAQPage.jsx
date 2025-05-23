import React from "react";
import { FaChevronDown } from "react-icons/fa";
import faq from "../../../assets/images/FAQ.jpg";

const faqData = [
  {
    category: "Ranks",
    questions: [
      {
        q: "How do we get Rank in Aetheric Dynamics?",
        a: "Anyone who signs up on the website of Aetheric Dynamics for purchasing gets the rank of Fashion Consultant (FC)."
      },
      {
        q: "Do we need to pay any charge for getting rank upgrade in Aetheric Dynamics?",
        a: "No, you are not required to pay anything. Ranks are awarded based on your shopping activity."
      },
      {
        q: "How many ranks are there?",
        a: `There are eight ranks:
        1) FC (Fashion Consultant)
        2) IBC (Aetheric Dynamics Business Coordinator)
        3) FI (Fashion Influencer)
        4) BD (Business Developer)
        5) BR (Bronze)
        6) TL (Team Leader)
        7) MQ (Marquis of Aetheric Dynamics)
        8) Ambassador (Ambassador of Aetheric Dynamics)`
      },
      {
        q: "What is the use of getting ranks?",
        a: "You will get more discounts with each increasing rank."
      }
    ]
  },
  {
    category: "Registration",
    questions: [
      {
        q: "How do we complete registration in Aetheric Dynamics?",
        a: "You can get a User Distributor agreement by contacting our head or branch office."
      },
      {
        q: "How do we get the address of your branches?",
        a: "Contact our customer support or WhatsApp number to get branch office details in your state."
      }
    ]
  },
  {
    category: "Product Order",
    questions: [
      {
        q: "How do I check the status of my order?",
        a: "Go to 'Track my order' under Dashboard of the App/Website."
      },
      {
        q: "How are orders delivered to me?",
        a: "Orders are dispatched through partners like Blue Dart, Delhivery, and DTDC."
      },
      {
        q: "Does Aetheric Dynamics deliver outside India?",
        a: "No, delivery is currently available only within India."
      },
      {
        q: "Can I get faster delivery?",
        a: "Not currently. If such service is introduced, we will notify based on your serviceable pincode."
      },
      {
        q: "I received a partial/void item. What should I do?",
        a: `Contact us within 48 hours. Keep the packaging intact. Provide description, snapshots, and details.
        Delays or missing information may void the refund.`
      }
    ]
  },
  {
    category: "Product Shipping",
    questions: [
      {
        q: "Can I modify the shipping address?",
        a: "No. Products are shipped to Aetheric Dynamics branch offices in your state."
      }
    ]
  },
  {
    category: "Payments",
    questions: [
      {
        q: "Can we pay cash on delivery?",
        a: "No. Only digital payments are accepted (debit/credit cards, net banking)."
      },
      {
        q: "Is online payment on delivery available?",
        a: "No. Payment must be made at the time of order placement."
      }
    ]
  },
  {
    category: "Order Return & Refund",
    questions: [
      {
        q: "How do I create a Return Request?",
        a: "Contact support via mail, call or WhatsApp with your registered ID/number and reason."
      },
      {
        q: "Do I get the Refund immediately?",
        a: "No. Refunds are processed after a minimum of 24 hours post-request."
      },
      {
        q: "Can I claim refund any time after purchase?",
        a: "No. Refunds are applicable within 15 days from purchase only."
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-10 text-gray-800">
      {/* Banner Section */}
      <div className="relative mb-12">
        <img
          src={faq}
          alt="FAQ Banner"
          className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-xl shadow-md"
        />
        <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-white text-center absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl">
          Frequently Asked Questions
        </h1>
      </div>

      {/* FAQ Sections */}
      {faqData.map((section, i) => (
        <div key={i} className="mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-rose-600 mb-4 border-b pb-2">
            {section.category}
          </h2>
          <div className="space-y-4">
            {section.questions.map((item, j) => (
              <details
                key={j}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm cursor-pointer transition-all open:shadow-md open:ring-1 open:ring-indigo-300"
              >
                <summary className="font-medium flex justify-between items-center text-indigo-700 text-base sm:text-lg">
                  {item.q}
                  <FaChevronDown className="ml-2 transition-transform duration-300 open:rotate-180 text-sm" />
                </summary>
                <p className="mt-2 text-gray-700 whitespace-pre-line text-sm sm:text-base">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

