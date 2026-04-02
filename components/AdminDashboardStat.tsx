import { Icon } from "@iconify/react";

export default function AdminDashboardStat({ statName, statValue, icon }: {
    statName: string,
    statValue: string | number,
    icon: string
}) {
    return (
        <div className="border border-gray-300 rounded-xl px-6 py-8 bg-[#151c2b]">
            <div className="flex justify-between items-center">
                <h1 className="text-xl text-secondary-50 font-semibold">{statName}</h1>
                <Icon className="text-2xl text-gray-400" icon={icon}/>
            </div>
            <p className="text-3xl font-bold text-secondary-50 mt-2">{statValue}</p>
        </div>
    );
}