import Image from "next/image";
import Footer from "../component/Footer";
import stepOneImage from "../../assets/png/step1.png";
import stepTwoImage from "../../assets/png/step2.png";
import stepThreeImage from "../../assets/png/step 3.png";
import stepFourImage from "../../assets/png/step 4.png";

const steps = [
  {
    step: "Step 1",
    title: "Initiate a Transaction",
    description:
      "Both the buyer and seller agree to the terms of their deal, and the buyer initiates the transaction by depositing funds into the escrow platform.",
    image: stepOneImage,
    imageAlt: "A buyer tapping a card machine with a mobile phone",
  },
  {
    step: "Step 2",
    title: "Seller Delivers Goods or Services",
    description:
      "The buyer's funds remain in the escrow account, ensuring that the seller will not receive payment until the goods or services are received and approved.",
    image: stepTwoImage,
    imageAlt: "A seller handing over a shopping bag to a buyer",
  },
  {
    step: "Step 3",
    title: "Buyer Confirms Receipt",
    description:
      "Once the seller delivers the goods or completes the service, the buyer take the time to inspect the goods or assess the services, and if satisfied, click 'Confirm Receipt' to release the funds to the seller. If there's an issue, MIMOTAR is here to help resolve disputes quickly and fairly.",
    image: stepThreeImage,
    imageAlt:
      "A buyer confirming receipt on a mobile phone beside a delivered package",
  },
  {
    step: "Step 4",
    title: "Release of Funds",
    description:
      "Once the buyer confirms they have received the goods or services and are satisfied with the transaction, the escrow platform releases the funds to the seller.",
    image: stepFourImage,
    imageAlt: "Hands holding a jar filled with cash",
  },
];

export default function Page() {
  return (
    <section className="flex min-h-full flex-col bg-white">
      <div className="w-[90%] max-w-[1120px] mx-auto py-6 sm:py-8 lg:py-10">
        <div className="max-w-[860px]">
          <h1 className="text-[2rem] font-semibold leading-tight text-slate-900 sm:text-[2.5rem]">
            How MIMOTAR Works
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
            We are dedicated to providing secure, reliable, and efficient escrow
            services to individuals and businesses alike.
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            We offer a seamless and secure escrow experience, backed by a team
            that genuinely cares about your success.
          </p>
        </div>

        <div className="mt-10 space-y-8 sm:mt-12 sm:space-y-10 lg:space-y-12">
          {steps.map((item, index) => {
            const isEvenRow = index % 2 === 1;

            return (
              <article
                key={item.step}
                className="grid items-center gap-6 rounded-[28px] bg-white lg:grid-cols-2 lg:gap-10"
              >
                <div
                  className={`order-1 ${isEvenRow ? "lg:order-2" : "lg:order-1"}`}
                >
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    priority={index === 0}
                    className="h-[220px] w-full rounded-[12px] object-cover sm:h-[260px] lg:h-[230px]"
                  />
                </div>

                <div
                  className={`order-2 ${isEvenRow ? "lg:order-1" : "lg:order-2"}`}
                >
                  <p className="text-[1.75rem] font-semibold leading-none text-[#B334D2]">
                    {item.step}
                  </p>
                  <h2 className="mt-3 text-lg font-semibold text-slate-800 sm:text-xl">
                    {item.title}
                  </h2>
                  <p className="mt-3 max-w-[490px] text-sm leading-6 text-slate-600 sm:text-base">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </section>
  );
}
