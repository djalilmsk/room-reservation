import { Section, SectionTitle } from "@/components/ui/section";
import about from "@/assets/about.png";
import { cn } from "@/lib/utils";

const stats = {
  rooms: 100,
  Employees: 200,
  users: 10000,
};

function Stats({ className }) {
  const formatNumber = (num) => {
    if (num >= 1000000) return `${num / 1000000}m`;
    if (num >= 1000) return `${num / 1000}k`;
    return num;
  };

  return (
    <div
      className={cn(
        "bg-secondary/60 flex gap-3 p-3 md:gap-5 md:p-6 lg:p-10",
        className,
      )}
    >
      <div className="bg-card w-full rounded-xl p-3 text-center md:p-5">
        <h1 className="text-2xl font-bold lg:text-4xl">
          {formatNumber(stats.rooms)}+
        </h1>
        <h3 className="text-sm font-semibold md:text-base lg:text-xl">Rooms</h3>
      </div>
      <div className="bg-card w-full rounded-xl p-3 text-center md:p-5">
        <h1 className="text-2xl font-bold lg:text-4xl">
          {formatNumber(stats.Employees)}+
        </h1>
        <h3 className="text-sm font-semibold md:text-base lg:text-xl">
          Employees
        </h3>
      </div>
      <div className="bg-card w-full rounded-xl p-3 text-center md:p-5">
        <h1 className="text-2xl font-bold lg:text-4xl">
          {formatNumber(stats.users)}+
        </h1>
        <h3 className="text-sm font-semibold md:text-base lg:text-xl">
          Customers
        </h3>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <Section className="grid-cols-2 gap-10 md:grid">
      <div className="relative w-full max-md:hidden">
        <img
          src={about}
          alt="about"
          className="rounded-tl-[160px] object-cover"
        />
        <Stats className="absolute top-[80%] -right-1/2" />
      </div>
      <div>
        <SectionTitle className="md:leading-12 lg:text-5xl lg:leading-18 lg:text-nowrap">
          Your Smarter Space <br className="max-md:hidden" /> Booking Partner
        </SectionTitle>
        <p className="text-secondary-foreground mt-3 text-xs lg:mt-5 lg:text-base xl:text-xl">
          We’re ROOM—your smart solution for booking meeting spaces
          effortlessly. Since 2025, we’ve helped teams find ideal venues faster,
          cheaper, and with zero stress.
        </p>
        <p className="text-secondary-foreground mt-3 text-sm lg:mt-5 lg:text-base xl:text-xl">
          ROOM, founded in 2021, connects teams to ready-to-use meeting spaces
          with fast booking and clear pricing—making meetings easier and more
          efficient.
        </p>
      </div>

      <Stats className="md:hidden" />
    </Section>
  );
}

export default Hero;
