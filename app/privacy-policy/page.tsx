import type React from "react";
import {
  FadeInAnimation,
  SlowFadeInAnimation,
} from "../components/fade-in-animation";
import Link from "next/link";
import { Shield, Mail } from "lucide-react";

const PolicySection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white rounded-lg shadow-lg p-8 mb-8 transition-all duration-300 hover:shadow-xl">
    <h2 className="text-2xl font-semibold mb-4 text-[#00ae89] flex items-center">
      <Shield className="mr-2 h-6 w-6" />
      {title}
    </h2>
    {children}
  </div>
);

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#e6f7f3] py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <FadeInAnimation>
          <h1 className="text-4xl font-bold text-center mb-4">
            Privacy <span className="text-[#00ae89]">Policy</span>
          </h1>
          <SlowFadeInAnimation>
            <p className="text-xl text-center text-gray-600 mb-12">
              At HouseSync, we value your privacy and are committed to
              protecting your personal information.
            </p>
          </SlowFadeInAnimation>

          <PolicySection title="Introduction">
            <p className="mb-4 text-gray-700 leading-relaxed">
              Welcome to HouseSync's Privacy Policy. This policy describes how
              we collect, use, and handle your personal information when you use
              our services. We are committed to ensuring that your privacy is
              protected and that we comply with applicable data protection laws.
            </p>
          </PolicySection>

          <PolicySection title="Information We Collect">
            <p className="mb-4 text-gray-700 leading-relaxed">
              We collect information you provide directly to us, such as when
              you create an account, fill out a form, or communicate with us.
              This may include:
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
              <li>Name and contact information</li>
              <li>Account login credentials</li>
              <li>Payment information</li>
              <li>Profile information</li>
              <li>Communication data</li>
            </ul>
          </PolicySection>

          <PolicySection title="How We Use Your Information">
            <p className="mb-4 text-gray-700 leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>
                Send you technical notices, updates, security alerts, and
                support messages
              </li>
              <li>
                Respond to your comments, questions, and customer service
                requests
              </li>
              <li>
                Communicate with you about products, services, offers, and
                events
              </li>
            </ul>
          </PolicySection>

          <PolicySection title="Data Security">
            <p className="mb-4 text-gray-700 leading-relaxed">
              We implement appropriate technical and organizational measures to
              protect the security of your personal information. However, please
              note that no method of transmission over the Internet or
              electronic storage is 100% secure. We strive to use commercially
              acceptable means to protect your personal information, but we
              cannot guarantee its absolute security.
            </p>
          </PolicySection>

          <PolicySection title="Your Rights">
            <p className="mb-4 text-gray-700 leading-relaxed">
              Depending on your location, you may have certain rights regarding
              your personal information, such as the right to:
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to or restrict the processing of your information</li>
              <li>
                Request a copy of your information in a structured, commonly
                used, and machine-readable format
              </li>
            </ul>
          </PolicySection>

          <PolicySection title="Changes to This Policy">
            <p className="mb-4 text-gray-700 leading-relaxed">
              We may update this privacy policy from time to time. We will
              notify you of any changes by posting the new privacy policy on
              this page and updating the "Last updated" date at the bottom of
              this policy. We encourage you to review this privacy policy
              periodically for any changes.
            </p>
          </PolicySection>

          <PolicySection title="Contact Us">
            <p className="mb-4 text-gray-700 leading-relaxed">
              If you have any questions about this privacy policy, please
              contact us at:
            </p>
            <Link
              href="mailto:andypoon@housesync.us"
              className="text-[#00ae89] hover:underline flex items-center"
            >
              <Mail className="mr-2 h-5 w-5" />
              andypoon@housesync.us
            </Link>
          </PolicySection>

          <p className="text-center text-gray-600 mt-12">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </FadeInAnimation>
      </div>
    </div>
  );
}
