/** Typografia PL (jak w designie): jednoliterowe spójniki/przyimki („a", „i", „w", „z"…)
 *  sklejone twardą spacją z kolejnym słowem, żeby nie wisiały na końcu linii. */
export const nbspOrphans = (t: string) => t.replace(/(^|\s)([aiouwzAIOUWZ]) /g, "$1$2\u00a0");
