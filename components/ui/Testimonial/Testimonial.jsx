import SectionWrapper from "@/components/SectionWrapper";
import GradientWrapper from "@/components/GradientWrapper";
import user1 from "@/public/testimonial/user1.webp";
import user2 from "@/public/testimonial/user2.webp";
import user3 from "@/public/testimonial/user3.webp";
import user4 from "@/public/testimonial/user4.webp";
import user5 from "@/public/testimonial/user5.webp";
import user6 from "@/public/testimonial/user6.webp";
import Image from "next/image";
import LayoutEffect from "@/components/LayoutEffect";

const Testimonial = () => {
  const testimonials = [
    {
      avatar: user1,
      name: "David M.",
      title: "Professional Trader",
      quote:
        "CopyCube has revolutionized the way I trade. The automated profit tracking is a game-changer!",
    },
    {
      avatar: user2,
      name: "Micheal T.",
      title: "Financial Analyst",
      quote:
        "I love how secure and transparent the platform is. I feel confident investing my funds here.",
    },
    {
      avatar: user3,
      name: "Mark J.",
      title: "Entrepreneur",
      quote:
        "The expert guidance provided has helped me make smarter investment decisions. Highly recommended!",
    },
    {
      avatar: user4,
      name: "Emma K.",
      title: "New Investor",
      quote:
        "CopyCube's user-friendly interface makes it so easy to manage my portfolio, even on the go.",
    },
    {
      avatar: user5,
      name: "Liam R.",
      title: "Part-Time Trader",
      quote:
        "The flexible investment plans cater to my needs perfectly, whether I'm scaling up or testing the waters.",
    },
    {
      avatar: user6,
      name: "Philip L.",
      title: "Seasoned Investor",
      quote:
        "CopyCube truly takes forex trading to the next level. My returns have never been this consistent.",
    },
  ];

  return (
    <SectionWrapper>
      <div id="testimonials" className="custom-screen text-gray-300">
        <div className="max-w-2xl text-center md:mx-auto">
          <h2 className="text-gray-50 text-3xl font-semibold sm:text-4xl">
            CopyCube is loved by the best Forex Traders around the world
          </h2>
        </div>
        <GradientWrapper
          wrapperclassname="max-w-sm h-40 top-12 inset-x-0"
          className="mt-12"
        >
          <LayoutEffect
            className="duration-1000 delay-300"
            isInviewState={{
              trueState: "opacity-1",
              falseState: "opacity-0 translate-y-12",
            }}
          >
            <ul className="grid gap-6 duration-1000 delay-300 ease-in-out sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((item, idx) => (
                <li
                  key={idx}
                  className="p-4 rounded-xl border border-gray-800"
                  style={{
                    backgroundImage:
                      "radial-gradient(100% 100% at 50% 50%, rgba(124, 58, 237, 0.05) 0%, rgba(124, 58, 237, 0) 100%)",
                  }}
                >
                  <figure className="flex flex-col justify-between gap-y-6 h-full">
                    <blockquote className="">
                      <p className="">{item.quote}</p>
                    </blockquote>
                    <div className="flex items-center gap-x-4">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div>
                        <span className="block text-gray-50 font-semibold">
                          {item.name}
                        </span>
                        <span className="block text-sm mt-0.5">
                          {item.title}
                        </span>
                      </div>
                    </div>
                  </figure>
                </li>
              ))}
            </ul>
          </LayoutEffect>
        </GradientWrapper>
      </div>
    </SectionWrapper>
  );
};

export default Testimonial;
