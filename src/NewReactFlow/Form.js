import { Handle } from "@xyflow/react";
import React from "react";

const FlowForm = () => {
    return(
        <>
            <Handle className={"w-2 h-2"} type="source" position="top" />
                <div className="w-full bg-gray-300">
                    <p className="bg-red-400">Form Box</p>
                    <div className="flex item-center gap-2 p-4">
                        <p>Name:</p>
                        <p>Guhan</p>
                    </div>
                </div>
            <Handle className={"w-2 h-2"} type="source" position="bottom" />
        </>
    )
}

export default FlowForm;