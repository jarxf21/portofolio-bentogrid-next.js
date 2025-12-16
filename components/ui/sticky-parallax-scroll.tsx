"use client";
import { cn } from "@/lib/utils";
import { CodeBracketIcon } from "@heroicons/react/24/outline";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";

// Generic interface for display
export interface StickyScrollItem {
    title: string;
    description: string;
    content?: React.ReactNode;
    imageUrl?: string;
}

export const StickyScroll = ({
    content,
    contentClassName,
}: {
    content: StickyScrollItem[];
    contentClassName?: string;
}) => {
    const [activeCard, setActiveCard] = React.useState(0);

    return (
        <div className="flex flex-col lg:flex-row gap-10 relative">
            {/* Left side: Scrollable Text Content */}
            <div className="w-full lg:w-1/2 flex flex-col gap-20 py-20 pr-10">
                {content.map((item, index) => (
                    <TextBlock
                        key={item.title + index}
                        item={item}
                        index={index}
                        setActiveCard={setActiveCard}
                        isActive={activeCard === index}
                    />
                ))}
                {/* Spacer to allow scrolling past the last item */}
                <div className="h-40" />
            </div>

            {/* Right side: Sticky Image Container */}
            <div className="hidden lg:block w-full lg:w-1/2 relative">
                <div
                    className={cn(
                        "sticky top-20 h-96 w-full rounded-2xl overflow-hidden bg-primary-100/50 shadow-xl border border-primary-500/20",
                        contentClassName
                    )}
                >
                    {/* Render all images stacked, fade between them */}
                    {content.map((item, index) => (
                        <motion.div
                            key={item.title + DEFAULT_KEY_SUFFIX + index}
                            className="absolute inset-0 w-full h-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: activeCard === index ? 1 : 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {item.imageUrl ? (
                                <Image
                                    src={item.imageUrl}
                                    alt={item.title}
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-500">
                                    <CodeBracketIcon className="w-20 h-20 opacity-20" />
                                </div>
                            )}
                            {/* Overlay Gradient for depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const DEFAULT_KEY_SUFFIX = "-sticky-image";

// Helper component to detect visibility
function TextBlock({ item, index, setActiveCard, isActive }: {
    item: StickyScrollItem,
    index: number,
    setActiveCard: (i: number) => void,
    isActive: boolean
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" }); // Trigger when centered

    React.useEffect(() => {
        if (isInView) {
            setActiveCard(index);
        }
    }, [isInView, index, setActiveCard]);

    return (
        <motion.div
            ref={ref}
            className={cn(
                "flex flex-col gap-4 transition-all duration-500 pl-6 border-l-4",
                isActive
                    ? "border-primary-500 opacity-100"
                    : "border-primary-200/50 opacity-40 blur-[1px]"
            )}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: isActive ? 1 : 0.4, y: 0 }}
            transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 50
            }}
            viewport={{ once: true, margin: "-100px" }}
        >
            <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                animate={{ opacity: isActive ? 1 : 0.3 }}
                className="text-3xl font-bold text-primary-950"
            >
                {item.title}
            </motion.h2>

            {/* Mobile Image (Visible only on small screens) */}
            <div className="lg:hidden w-full h-60 relative rounded-xl overflow-hidden my-4 bg-primary-100/50">
                {item.imageUrl ? (
                    <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-contain"
                        unoptimized
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <CodeBracketIcon className="w-12 h-12 text-slate-600" />
                    </div>
                )}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                animate={{ opacity: isActive ? 1 : 0.6 }}
                className="text-lg text-primary-950/70 leading-relaxed"
            >
                {item.description}
                <div className="mt-4">
                    {item.content}
                </div>
            </motion.div>
        </motion.div>
    )
}


