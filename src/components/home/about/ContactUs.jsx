import { Page } from "@/components/ui/page";
import { Section, SectionTitle } from "@/components/ui/section";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  Twitter,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import HomeFooter from "../Footer";

const ContactUs = () => {
  return (
    <Page className="space-y-12 max-sm:pt-18 sm:space-y-30 md:pt-10 lg:space-y-22">
      <Section className="flex min-h-screen flex-col justify-between">
        <div className="mx-auto">
          <SectionTitle className="mb-3">
            A Dedicated Team, Here to Help You
          </SectionTitle>

          <p className="text-secondary-foreground mb-6 w-3/4 max-sm:text-sm">
            WE'RE ROOMR—your smart solution for booking meeting spaces
            efficiently. Since 2023, we've helped teams find and manage spaces
            with zero stress.
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="bg-secondary/50 flex flex-col items-start rounded-lg p-6 text-center">
              <h3 className="mb-4 font-semibold">Contact information</h3>
              <div className="my-auto w-full space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 rounded-full p-2">
                    <Phone className="text-primary h-4 w-4" />
                  </div>
                  <span className="text-sm">+123 00-00-00-00</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 rounded-full p-2">
                    <Mail className="text-primary h-4 w-4" />
                  </div>
                  <span className="text-sm">example@roomr.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 rounded-full p-2">
                    <MapPin className="text-primary h-4 w-4" />
                  </div>
                  <span className="text-sm">25000, somewhere</span>
                </div>
              </div>
            </div>

            <div className="bg-secondary/50 flex flex-col items-start rounded-lg p-6 text-center">
              <h3 className="mb-6 font-semibold">Business hours</h3>
              <div className="flex h-full w-full flex-col justify-between space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm">Monday-Thursday</span>
                  </div>
                  <span className="text-sm">8:00AM-6:00PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm">Friday</span>
                  </div>
                  <span className="text-sm">8:00AM-1:00PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm">Saturday</span>
                  </div>
                  <span className="text-sm">10:00AM-4:00PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm">Sunday</span>
                  </div>
                  <span className="text-sm">Closed</span>
                </div>
              </div>
            </div>

            <div className="bg-secondary/50 flex flex-col items-start rounded-lg p-6 text-center">
              <h3 className="mb-4 font-semibold">Social media</h3>
              <div className="flex w-full justify-between space-y-4">
                <div className="w-full space-y-4">
                  <Link className="hover:text-primary flex items-center gap-3 transition-all duration-300">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Facebook className="text-primary h-5 w-5" />
                    </div>
                    <span className="text-sm">Facebook</span>
                  </Link>
                  <Link className="hover:text-primary flex items-center gap-3 transition-all duration-300">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Linkedin className="text-primary h-5 w-5" />
                    </div>
                    <span className="text-sm">LinkedIn</span>
                  </Link>
                  <Link className="hover:text-primary flex items-center gap-3 transition-all duration-300">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Instagram className="text-primary h-5 w-5" />
                    </div>
                    <span className="text-sm">Instagram</span>
                  </Link>
                </div>

                <div className="w-full space-y-4">
                  <Link className="hover:text-primary flex items-center gap-3 transition-all duration-300">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Youtube className="text-primary h-5 w-5" />
                    </div>
                    <span className="text-sm">YouTube</span>
                  </Link>
                  <Link className="hover:text-primary flex items-center gap-3 transition-all duration-300">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Twitter className="text-primary h-5 w-5" />
                    </div>
                    <span className="text-sm">Twitter</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <HomeFooter />
      </Section>
    </Page>
  );
};

export default ContactUs;
