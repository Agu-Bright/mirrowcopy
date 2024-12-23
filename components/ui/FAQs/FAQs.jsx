import LayoutEffect from "@/components/LayoutEffect";
import SectionWrapper from "@/components/SectionWrapper";

const faqsList = [
  {
    q: "What is Forex Investment, and how does it work?",
    a: "Forex investment involves trading currencies in the foreign exchange market to earn profits from fluctuating exchange rates. Our platform allows you to invest in forex with guided tools and strategies to optimize your returns.",
  },
  {
    q: "How secure is my investment and personal information?",
    a: "We prioritize the security of your investment and data by using industry-standard encryption and secure payment gateways. Additionally, funds are managed transparently, and we provide regular updates on your portfolio performance.",
  },
  {
    q: "What is the minimum amount required to start investing?",
    a: "The minimum investment amount is $10. This allows investors of all levels to participate and grow their portfolios at their own pace.",
  },
  {
    q: "How can I withdraw my earnings?",
    a: "Withdrawals are simple and fast! You can request a withdrawal from your account dashboard, and funds will be transferred to your registered bank account within 5 days.",
  },
  {
    q: "Do you provide any tools or resources to help me trade?",
    a: "Yes we offer access to real time market analysis, Forex tutorial Webinars, Investment strategies tailored to your risk profile.",
  },
  {
    q: "Is there a risk associated with forex trading?",
    a: "Yes, all investments come with risks. Forex trading is subject to market fluctuations, but our platform offers risk management tools and expert guidance to minimize potential losses.",
  },
];

const FAQs = () => (
  <SectionWrapper id="faqs">
    <div className="custom-screen text-gray-300">
      <div className="max-w-xl text-center xl:mx-auto">
        <h2 className="text-gray-50 text-3xl font-extrabold sm:text-4xl">
          Everything you need to know
        </h2>
        <p className="mt-3">
          Here are the most questions people always ask about.
        </p>
      </div>
      <div className="mt-12">
        <LayoutEffect
          className="duration-1000 delay-300"
          isInviewState={{
            trueState: "opacity-1",
            falseState: "opacity-0 translate-y-12",
          }}
        >
          <ul className="space-y-8 gap-12 grid-cols-2 sm:grid sm:space-y-0 lg:grid-cols-3">
            {faqsList.map((item, idx) => (
              <li key={idx} className="space-y-3">
                <summary className="flex items-center justify-between font-semibold text-gray-100">
                  {item.q}
                </summary>
                <p
                  dangerouslySetInnerHTML={{ __html: item.a }}
                  className="leading-relaxed"
                ></p>
              </li>
            ))}
          </ul>
        </LayoutEffect>
      </div>
    </div>
  </SectionWrapper>
);

export default FAQs;
