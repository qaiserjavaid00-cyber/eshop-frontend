import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import StoreMap from "@/components/StoreMap"

export default function ContactPage() {
    return (
        <div className="max-w-6xl mx-auto px-6 py-16 space-y-14">

            {/* Header */}
            <div className="text-center space-y-3">
                <h1 className="text-4xl font-bold">Contact Our Team</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Have questions about our electronics, orders, or services?
                    We're here to help. Reach out using any of the options below.
                </p>
            </div>

            {/* Contact Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Email */}
                <Card className="hover:shadow-lg transition">
                    <CardHeader className="flex flex-col items-center text-center gap-2">
                        <Mail className="w-8 h-8 text-primary" />
                        <CardTitle>Email Support</CardTitle>
                    </CardHeader>

                    <CardContent className="text-center space-y-3">
                        <p className="text-sm text-muted-foreground">
                            Send us an email and we'll respond within 24 hours.
                        </p>

                        <Button asChild className="w-full">
                            <a href="mailto:support@techstore.com?subject=Customer Inquiry">
                                Email Us
                            </a>
                        </Button>
                    </CardContent>
                </Card>


                {/* WhatsApp */}
                <Card className="hover:shadow-lg transition">
                    <CardHeader className="flex flex-col items-center text-center gap-2">
                        <MessageCircle className="w-8 h-8 text-green-600" />
                        <CardTitle>WhatsApp</CardTitle>
                    </CardHeader>

                    <CardContent className="text-center space-y-3">
                        <p className="text-sm text-muted-foreground">
                            Chat with our team instantly on WhatsApp.
                        </p>

                        <Button asChild className="w-full">
                            <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer">
                                Start Chat
                            </a>
                        </Button>
                    </CardContent>
                </Card>


                {/* Address */}
                <Card className="hover:shadow-lg transition">
                    <CardHeader className="flex flex-col items-center text-center gap-2">
                        <MapPin className="w-8 h-8 text-red-500" />
                        <CardTitle>Office</CardTitle>
                    </CardHeader>

                    <CardContent className="text-center text-sm text-muted-foreground">
                        TechStore Electronics
                        <br />
                        123 Technology Street
                        <br />
                        Karachi, Pakistan
                    </CardContent>
                </Card>


                {/* Hours */}
                <Card className="hover:shadow-lg transition">
                    <CardHeader className="flex flex-col items-center text-center gap-2">
                        <Clock className="w-8 h-8 text-blue-500" />
                        <CardTitle>Support Hours</CardTitle>
                    </CardHeader>

                    <CardContent className="text-center text-sm text-muted-foreground">
                        Mon – Fri: 9AM – 6PM
                        <br />
                        Saturday: 10AM – 4PM
                        <br />
                        Sunday: Closed
                    </CardContent>
                </Card>

            </div>

            {/* Map */}
            <div className="border shadow-sm rounded-xl overflow-hidden">
                <StoreMap lat={24.8607} lng={67.0011} zoom={15} />
            </div>
            {/* CTA */}
            <div className="text-center space-y-3">
                <h3 className="text-xl font-semibold">
                    Need quick help?
                </h3>
                <p className="text-muted-foreground">
                    Our support team is ready to assist you with orders, returns, or product questions.
                </p>
            </div>

            {/* Floating WhatsApp */}
            <a
                href="https://wa.me/923001234567"
                target="_blank"
                className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition" rel="noreferrer"
            >
                <MessageCircle size={24} />
            </a>

        </div>
    )
}