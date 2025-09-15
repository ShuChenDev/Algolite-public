import Link from "next/link";
import { useEffect } from "react";

export default function Popup({ show, onClose }: { show: boolean; onClose: () => void }) {

  useEffect(() => {
    if (show) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-transparent"
      ></div>

      <div className="relative bg-white rounded-xl shadow-lg p-6 z-10 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">⚠️ Attention!</h2>
        <p className="mb-6 text-gray-800 leading-relaxed">
          This is a <strong>personal, experimental project</strong> created for educational and recreational purposes only.
          <br /><br />
          The author of this website does <strong>not</strong> take any responsibility for:
          <li className="ml-4">Financial losses if used in real-world trading.</li>
          <li className="ml-4">System issues, connection failures, or outages.</li>
          <li className="ml-4">Misuse, misconfiguration, or improper deployment.</li>
          <li className="ml-4">Any other consequences of using this website.</li>
        </p>

        <p className="mb-6 text-gray-800 leading-relaxed">
          To start trading, download and run:

          <li className="ml-4"><Link className="text-blue-600" href="https://github.com/ShuChenDev/Algolite-public/releases" target="_blank">algolite-server.exe</Link> </li>
          <li className="ml-4"><Link className="text-blue-600" href="https://www.interactivebrokers.ca/en/trading/ibgateway-latest.php" target="_blank">Interactive Brokers Gateway</Link> </li>
        </p>

        <p className="mb-6 text-gray-800 leading-relaxed">
          Use at your own risk, more information please visit <Link className="text-blue-600" href="https://github.com/ShuChenDev/Algolite-public" target="_blank">https://github.com/ShuChenDev/Algolite-public</Link>
        </p>


        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Agree
        </button>
      </div>
    </div>
  );
}
