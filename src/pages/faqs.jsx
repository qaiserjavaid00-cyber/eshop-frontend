import { useState } from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const faqData = {
    shopping: [
        {
            q: "What types of electronics do you sell?",
            a: "We offer smartphones, laptops, gaming gear, smart home devices, accessories, and many other modern electronics.",
        },
        {
            q: "Can I cancel my order?",
            a: "Yes, orders can be cancelled before they are shipped. Contact support quickly if you need to cancel.",
        },
    ],
    shipping: [
        {
            q: "How long does shipping take?",
            a: "Standard shipping usually takes 3–7 business days depending on your location.",
        },
        {
            q: "Do you offer international shipping?",
            a: "Currently we ship to selected countries. Shipping availability will be shown during checkout.",
        },
    ],
    returns: [
        {
            q: "Can I return a product?",
            a: "Yes, we offer a 7–14 day return policy for unused products in their original packaging.",
        },
        {
            q: "How long do refunds take?",
            a: "Refunds are processed within 3–5 business days after the returned item is inspected.",
        },
    ],
    support: [
        {
            q: "How can I contact support?",
            a: "You can contact our support team via email, live chat, or the contact form on our website.",
        },
        {
            q: "How do I track my order?",
            a: "You can track your order from your account dashboard or via the tracking link sent to your email.",
        },
    ],
}

export default function FAQPage() {
    const [search, setSearch] = useState("")

    const filterFaqs = (faqs) =>
        faqs.filter(
            (f) =>
                f.q.toLowerCase().includes(search.toLowerCase()) ||
                f.a.toLowerCase().includes(search.toLowerCase())
        )

    return (
        <div className="max-w-5xl mx-auto px-6 py-16">

            {/* Title */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-3">Frequently Asked Questions</h1>
                <p className="text-muted-foreground">
                    Everything you need to know about our electronics store.
                </p>
            </div>

            {/* Search */}
            <div className="mb-8">
                <Input
                    placeholder="Search questions..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Categories */}
            <Tabs defaultValue="shopping" className="w-full">

                <TabsList className="grid grid-cols-4 mb-6">
                    <TabsTrigger value="shopping">Shopping</TabsTrigger>
                    <TabsTrigger value="shipping">Shipping</TabsTrigger>
                    <TabsTrigger value="returns">Returns</TabsTrigger>
                    <TabsTrigger value="support">Support</TabsTrigger>
                </TabsList>

                {Object.entries(faqData).map(([key, faqs]) => (
                    <TabsContent key={key} value={key}>
                        <Accordion type="single" collapsible className="space-y-3">
                            {filterFaqs(faqs).map((faq, index) => (
                                <AccordionItem key={index} value={`${key}-${index}`}>
                                    <AccordionTrigger className="text-left">
                                        {faq.q}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        {faq.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </TabsContent>
                ))}
            </Tabs>

        </div>
    )
}