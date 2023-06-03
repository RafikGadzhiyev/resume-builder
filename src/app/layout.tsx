"use client";

import React, {Suspense} from "react";
import {Provider} from "react-redux";
import {store} from "../../state/store";
import AppLoading from "@/app/loading";

export default function RootLayout({
									   children,
								   }: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
		<body>
		<Suspense fallback={<AppLoading/>}>
			<Provider store={store}>{children}</Provider>
		</Suspense>
		</body>
		</html>
	);
}
