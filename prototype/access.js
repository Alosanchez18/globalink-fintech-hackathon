// GlöbaLink — each sender owns their own transfers (private per-user ledger).
// A signed-in visitor creates transfers from first load; only the author can
// edit their own (e.g. flip pending → received). Transfers route to a private
// channel user:<handle>, so each person sees only their own history.
export function globalink(doc, oldDoc, user) {
  if (!user) throw { forbidden: "sign in to send money" };
  if (doc.type === "transfer") {
    if (doc.authorHandle !== user.userHandle) throw { forbidden: "not author" };
    if (oldDoc && oldDoc.authorHandle !== user.userHandle) throw { forbidden: "not author" };
  }
  const mine = `user:${user.userHandle}`;
  return { channels: [mine], grant: { users: { [user.userHandle]: [mine] } } };
}
