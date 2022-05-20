import React from "react";
import { AdvancedChart } from "react-tradingview-embed";

import symbolConverter from "../utils/symbolhash";

const Embed = React.memo((props) => {
	return (
		<AdvancedChart
			widgetProps={{
				// width: 1150,
				// height: 610,
				symbol: `${symbolConverter(props.symbol)}`,
				interval: "D",
				timezone: "Europe/Rome",
				theme: "light",
				style: "8",
				locale: "en",
				toolbar_bg: "#f1f3f6",
				enable_publishing: false,
				withdateranges: true,
				save_image: false,

				container_id: "tradingview_929ec",
			}}
		/>
	);
});

export default Embed;
