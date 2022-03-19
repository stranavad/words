export default async function handler(_, res) {
	try {
		// rebuilding everything
        await res.unstable_revalidate("/");
        await res.unstable_revalidate("/add");
        await res.unstable_revalidate("/units");
		return res.json({ revalidated: true });
	} catch (err) {
		return res.status(500).send("Error revalidating");
	}
}
