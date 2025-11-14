"use client";
import { SwatchBook, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from '@/components/ui/button';

type Props = {
    selectedEl: HTMLElement | null;
    clearSelection: () => void;
};

function ElementSettingSection({ selectedEl, clearSelection }: Props) {
    const [classes, setClasses] = useState<string[]>([]);
    const [newClass, setNewClass] = useState("");

    // Controlled states for styles
    const [fontSize, setFontSize] = useState("24px");
    const [color, setColor] = useState("#000000");
    const [bgColor, setBgColor] = useState("#ffffff");
    const [borderRadius, setBorderRadius] = useState("");
    const [padding, setPadding] = useState("");
    const [margin, setMargin] = useState("");
    const [align, setAlign] = useState<"left" | "center" | "right">("left");

    // Apply style helper
    const applyStyle = (property: string, value: string) => {
        if (selectedEl) {
            selectedEl.style[property as any] = value;
        }
    };

    // Sync states when selectedEl changes
    useEffect(() => {
        if (!selectedEl) return;

        setFontSize(selectedEl.style.fontSize || "24px");
        setColor(selectedEl.style.color || "#000000");
        setBgColor(selectedEl.style.backgroundColor || "#ffffff");
        setBorderRadius(selectedEl.style.borderRadius || "");
        setPadding(selectedEl.style.padding || "");
        setMargin(selectedEl.style.margin || "");
        setAlign((selectedEl.style.textAlign as "left" | "center" | "right") || "left");

        // Sync classes
        const currentClasses = selectedEl.className
            .split(" ")
            .filter((c) => c.trim() !== "");
        setClasses(currentClasses);

        // Watch for external class changes
        const observer = new MutationObserver(() => {
            const updated = selectedEl.className
                .split(" ")
                .filter((c) => c.trim() !== "");
            setClasses(updated);
        });
        observer.observe(selectedEl, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, [selectedEl]);

    // Update alignment style
    useEffect(() => {
        applyStyle("textAlign", align);
    }, [align]);

    // Remove a class
    const removeClass = (cls: string) => {
        const updated = classes.filter((c) => c !== cls);
        setClasses(updated);
        if (selectedEl) selectedEl.className = updated.join(" ");
    };

    // Add new class
    const addClass = () => {
        const trimmed = newClass.trim();
        if (!trimmed) return;
        if (!classes.includes(trimmed)) {
            const updated = [...classes, trimmed];
            setClasses(updated);
            if (selectedEl) selectedEl.className = updated.join(" ");
        }
        setNewClass("");
    };

    return (
        <div className='w-96 shadow p-4 space-y-4 overflow-auto h-[90vh] rounded-xl mt-2 mr-2'>
            <h2 className='flex gap-2 items-center font-bold'>
                <SwatchBook /> Settings
            </h2>

            {/* Font Size + Text Color */}
            <div className="flex items-center gap-4">
                <div className="flex-1">
                    <label className='text-sm'>Font Size</label>
                    <Select
                        value={fontSize}
                        onValueChange={(value) => {
                            setFontSize(value);
                            applyStyle("fontSize", value);
                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Size" />
                        </SelectTrigger>
                        <SelectContent>
                            {[...Array(53)].map((_, index) => (
                                <SelectItem value={`${index + 12}px`} key={index}>
                                    {index + 12}px
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label className='text-sm block'>Text Color</label>
                    <input
                        placeholder='color'
                        type='color'
                        className='w-10 h-10 rounded-lg mt-1'
                        value={color}
                        onChange={(e) => {
                            setColor(e.target.value);
                            applyStyle("color", e.target.value);
                        }}
                    />
                </div>
            </div>

            {/* Text Alignment */}
            <div>
                <label className="text-sm mb-1 block">Text Alignment</label>
                <ToggleGroup
                    type="single"
                    value={align}
                    onValueChange={(value) => setAlign(value as any)}
                    className="bg-gray-100 rounded-lg p-1 inline-flex w-full justify-between"
                >
                    <ToggleGroupItem value="left" className="p-2 rounded hover:bg-gray-200 flex-1">
                        <AlignLeft size={20} />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="center" className="p-2 rounded hover:bg-gray-200 flex-1">
                        <AlignCenter size={20} />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="right" className="p-2 rounded hover:bg-gray-200 flex-1">
                        <AlignRight size={20} />
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>

            {/* Background + Border Radius */}
            <div className="flex items-center gap-4">
                <div>
                    <label className='text-sm block'>Background</label>
                    <input
                    placeholder='color'
                        type='color'
                        className='w-10 h-10 rounded-lg mt-1'
                        value={bgColor}
                        onChange={(e) => {
                            setBgColor(e.target.value);
                            applyStyle("backgroundColor", e.target.value);
                        }}
                    />
                </div>
                <div className="flex-1">
                    <label className='text-sm'>Border Radius</label>
                    <Input
                        type='text'
                        placeholder='e.g. 8px'
                        value={borderRadius}
                        onChange={(e) => {
                            setBorderRadius(e.target.value);
                            applyStyle("borderRadius", e.target.value);
                        }}
                        className='mt-1'
                    />
                </div>
            </div>

            {/* Padding */}
            <div>
                <label className='text-sm'>Padding</label>
                <Input
                    type='text'
                    placeholder='e.g. 10px 15px'
                    value={padding}
                    onChange={(e) => {
                        setPadding(e.target.value);
                        applyStyle("padding", e.target.value);
                    }}
                    className='mt-1'
                />
            </div>

            {/* Margin */}
            <div>
                <label className='text-sm'>Margin</label>
                <Input
                    type='text'
                    placeholder='e.g. 10px 15px'
                    value={margin}
                    onChange={(e) => {
                        setMargin(e.target.value);
                        applyStyle("margin", e.target.value);
                    }}
                    className='mt-1'
                />
            </div>

            {/* Classes Manager */}
            <div>
                <label className="text-sm font-medium">Classes</label>
                <div className="flex flex-wrap gap-2 mt-2">
                    {classes.length > 0 ? (
                        classes.map((cls) => (
                            <span
                                key={cls}
                                className="flex items-center gap-1 px-2 py-1 text-sm rounded-full bg-gray-100 border"
                            >
                                {cls}
                                <button
                                    onClick={() => removeClass(cls)}
                                    className="ml-1 text-red-500 hover:text-red-700"
                                >
                                    ×
                                </button>
                            </span>
                        ))
                    ) : (
                        <span className="text-gray-400 text-sm">No classes applied</span>
                    )}
                </div>

                <div className="flex gap-2 mt-3">
                    <Input
                        value={newClass}
                        onChange={(e) => setNewClass(e.target.value)}
                        placeholder="Add class..."
                    />
                    <Button type="button" onClick={addClass}>
                        Add
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ElementSettingSection;
