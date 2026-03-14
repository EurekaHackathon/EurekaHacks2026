export function Input({ label, ...props }: any) {
    return (
        <div className="flex-1">
            <label className="block text-lg font-medium text-gray-100">
                {label} {props.required && <span className="text-error-600">*</span>}
            </label>
            <input {...props}
                   className="border-secondary-700 border hover:border-secondary-500 focus:outline-none rounded-lg w-full py-2 px-4 mt-2 bg-[#030712] text-gray-100 placeholder-gray-500"/>
        </div>
    );
}