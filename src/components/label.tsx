type Labelprops = {
    labelFor: "Col" | "Row",
    index: number,
}


export default function Label(labelProps: Labelprops) {
    const { labelFor, index } = labelProps;
    return (
        <div
            key={`rowId-${index}`}
            className="flex justify-center items-center w-24 h-12 bg-gray-300 border border-gray-300"
        >
            {labelFor === "Row" ? index + 1 :  String.fromCharCode('A'.charCodeAt(0) + index)}
        </div>
    
    )
}