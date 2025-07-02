import { X, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <a
            href="https://x.com/GemTriFi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">X (Twitter)</span>
            <X className="h-6 w-6" aria-hidden="true" />
          </a>
          <a
            href="https://www.instagram.com/housesync.us/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Instagram</span>
            <Instagram className="h-6 w-6" aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/company/housesync"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="h-6 w-6" aria-hidden="true" />
          </a>
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-base text-gray-400">
            &copy; 2025 HouseSync, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
