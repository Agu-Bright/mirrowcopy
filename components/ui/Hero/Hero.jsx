import GradientWrapper from "@/components/GradientWrapper";
import Image from "next/image";
import NavLink from "../NavLink";
import HeroImg from "@/public/images/hero.svg";
import LayoutEffect from "@/components/LayoutEffect";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";
const Hero = () => (
  <section>
    <div className="custom-screen py-10">
      <LayoutEffect
        className="duration-1000 delay-300"
        isInviewState={{
          trueState: "opacity-1",
          falseState: "opacity-0",
        }}
      >
        <div>
          <div className="space-y-5 max-w-3xl mx-auto text-center">
            <h1
              className="text-4xl bg-clip-text text-transparent bg-gradient-to-r font-extrabold mx-auto sm:text-6xl"
              style={{
                backgroundImage:
                  "linear-gradient(179.1deg, #FFFFFF 0.77%, rgba(255, 255, 255, 0) 182.09%)",
              }}
            >
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #00C6FF, #0072FF)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                Copy Trading
              </span>{" "}
              is Even Better Now{" "}
            </h1>
            <p className="max-w-xl mx-auto text-gray-300">
              Providing you the opportunity to copy experts in more than 50
              assets for continuous income
            </p>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AvatarGroup spacing="medium">
                <Avatar alt="Remy Sharp" src="/img/facebook.png" />
                <Avatar alt="Travis Howard" src="/img/tesla.png" />
                <Avatar alt="Cindy Baker" src="/img/apple.png" />
              </AvatarGroup>
            </Box>
            <div className="flex justify-center font-medium text-sm">
              <NavLink
                href="/user/login"
                style={{ background: "#00CBCB" }}
                className="flex items-center text-whitehover:bg-sky-400 active:bg-sky-400 "
              >
                Start Trading{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </NavLink>
            </div>
          </div>
          <GradientWrapper
            className="mt-16 sm:mt-28"
            wrapperclassname="max-w-3xl h-[250px] top-12 inset-0 sm:h-[300px] lg:h-[650px]"
          >
            <Image
              src={HeroImg}
              className="shadow-lg rounded-2xl"
              alt="Mailgo"
            />
          </GradientWrapper>
        </div>
      </LayoutEffect>
    </div>
  </section>
);

export default Hero;
