import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Image from "next/image";

// Payment methods array with icons/logos
const paymentMethods = [
  {
    name: "Visa",
    icon: "https://res.cloudinary.com/dwelabpll/image/upload/v1740510483/avifhpngg_iihckm.webp",
  },
  {
    name: "Mastercard",
    icon: "https://res.cloudinary.com/dwelabpll/image/upload/v1740509594/mastercard_PNG26_tcbufk.png",
  },
  {
    name: "American Express",
    icon: "https://res.cloudinary.com/dwelabpll/image/upload/v1740509785/images_iessk6.png",
  },
  {
    name: "bKash",
    icon: "https://res.cloudinary.com/dwelabpll/image/upload/v1740509601/BKash-bKash2-Logo.wine_yl89b2.png",
  },
  {
    name: "Nagad",
    icon: "https://res.cloudinary.com/dwelabpll/image/upload/v1740509686/Nagad-Logo.wine_asyuov.png",
  },
  {
    name: "Rocket",
    icon: "https://res.cloudinary.com/dwelabpll/image/upload/v1740509766/Rocket_ddbl_oti7lv.png",
  },
  {
    name: "UCB",
    icon: "https://res.cloudinary.com/dwelabpll/image/upload/v1740509807/ucb-bank-logo-DC3AED4E7A-seeklogo.com_dd3oec.png",
  },
  {
    name: "City Bank",
    icon: "https://res.cloudinary.com/dwelabpll/image/upload/v1740509872/22565-city-bank-logo_dwfwae.png",
  },
  {
    name: "EBL",
    icon: "https://res.cloudinary.com/dwelabpll/image/upload/v1740509947/icon_vpctbg.webp",
  },
  {
    name: "DBBL",
    icon: "https://res.cloudinary.com/dwelabpll/image/upload/v1740510140/DBBL-Logo-504x480_eeqyxa.png",
  },
];

// App download options
const downloadOptions = [
  {
    name: "Google Play",
    icon: "https://res.cloudinary.com/dwelabpll/image/upload/v1740510620/images_xz86ng-removebg-preview_z3k3av.png",
    link: "#",
  },
  {
    name: "App Store",
    icon: "https://res.cloudinary.com/dwelabpll/image/upload/v1740510631/app-store-logo-app-store-icon-white-11562871464udagr53bau_db45le-removebg-preview_c9ffmt.png",
    link: "#",
  },
  {
    name: "Windows",
    icon: "https://res.cloudinary.com/dwelabpll/image/upload/v1740510774/preview_507f0aa685ee6dfa8175b150761252ff-removebg-preview_zw2yi9.png",
    link: "#",
  },
];

export default function Footer() {
  return (
    <footer className="bg-blue-100 pl-12 pr-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Us Section */}
          <div>
            <h3 className="font-bold mb-4">About Us</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We are dedicated to providing quality education and helping
              students achieve their career goals through comprehensive online
              courses.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-blue-600 hover:text-blue-800">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-blue-600 hover:text-blue-800">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-blue-600 hover:text-blue-800">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-blue-600 hover:text-blue-800">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/courses"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="font-bold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                Ka-6/a, Navana Sylvania
              </li>
              <li className="text-sm text-muted-foreground">
                Baridhara Road, Nadda, Gulshan-2
              </li>
              <li className="text-sm text-muted-foreground">
                Dhaka-1212, Bangladesh
              </li>
              <li className="text-sm text-muted-foreground">
                Email: devAcademy@email.com
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="font-bold mb-4">Download Our App</h3>
            <div className="flex flex-col gap-3">
              {downloadOptions.map((option) => (
                <Link
                  key={option.name}
                  href={option.link}
                  className="inline-block bg-background hover:bg-accent rounded-lg p-2 transition-colors w-1/2"
                >
                  <Image
                    src={option.icon || "/placeholder.svg"}
                    alt={option.name}
                    width={135}
                    height={40}
                    className="h-8 w-full object-cover"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className="border-t pt-6">
          <div className="flex flex-wrap justify-center items-center gap-4">
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                className="bg-white p-2 rounded-md shadow-sm"
              >
                <Image
                  src={method.icon || "/placeholder.svg"}
                  alt={method.name}
                  width={40}
                  height={25}
                  className="h-6 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-sm text-muted-foreground mt-6">
          <p>© {new Date().getFullYear()} DevAcademy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
