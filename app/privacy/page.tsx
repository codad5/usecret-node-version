
import Header from "@/components/header";



export default async function Privacy() {
	return (
		<div className="overflow-x-hidden min-h-screen">
			<Header />
            <main className='w-full p-4'>
                <h1 className="text-3xl font-bold mb-4">Privacy Policy for uSecret</h1>

                <h2 className="text-xl font-bold mb-2">Introduction</h2>
                <p>Welcome to uSecret, an anonymous messaging app developed by Chibueze Aniezeofor (codad5).</p>

                <h2 className="text-xl font-bold mb-2 mt-6">Information We Collect</h2>
                <p>At uSecret, we collect and store the following types of information:</p>
                <ul className="list-disc pl-6">
                <li>User-provided information such as email addresses and WhatsApp phone numbers when registering for an account or connecting their WhatsApp account.</li>
                <li>Anonymous messages sent and received through the app.</li>
                </ul>

                <h2 className="text-xl font-bold mb-2 mt-6">How We Use Information</h2>
                <p>We use the information collected to:</p>
                <ul className="list-disc pl-6">
                <li>Facilitate the sending and receiving of anonymous messages between users.</li>
                <li>Provide personalized services, including connecting users' WhatsApp accounts to receive messages directly to their DMs.</li>
                <li>Improve and optimize the app's performance and user experience.</li>
                </ul>

                <h2 className="text-xl font-bold mb-2 mt-6">Information Sharing and Disclosure</h2>
                <p>We do not share or disclose users' personal information except in the following circumstances:</p>
                <ul className="list-disc pl-6">
                <li>With user consent or as necessary to provide the services requested by the user.</li>
                <li>To comply with legal obligations or enforce our Terms of Service.</li>
                </ul>

                <h2 className="text-xl font-bold mb-2 mt-6">Data Security</h2>
                <p>We take appropriate measures to safeguard users' personal information against unauthorized access, alteration, disclosure, or destruction.</p>

                <h2 className="text-xl font-bold mb-2 mt-6">Changes to This Privacy Policy</h2>
                <p>We may update our Privacy Policy from time to time. Any changes will be reflected on this page, and users will be notified of significant updates.</p>

                <p className="mt-8">For any questions or concerns regarding our Privacy Policy, please contact us at <a href="mailto:aniezeofor@gmail.com">aniezeofor@gmail.com</a>.</p>

                <p className="mt-4">&copy; 2024 uSecret. All rights reserved.</p>

            </main>
		</div>
	)
}
 