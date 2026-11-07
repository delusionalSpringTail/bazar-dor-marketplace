import React from "react";

const Footer = () => {
    return (
        <footer className="w-full bg-white border-t border-slate-100 py-6 sm:py-8 px-4 sm:px-6">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-500">
                    
                    {/* Left Brand / Text */}
                    <div className="text-center sm:text-left">
                        বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                    </div>

                    {/* Right Disclaimer Text */}
                    <div className="text-center sm:text-right text-slate-400">
                        সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
