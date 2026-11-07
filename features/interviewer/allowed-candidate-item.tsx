function AllowedCandidatesItem({ email }: { email: string }) {
  return (
    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border">
      <span className="text-sm font-medium text-foreground text-wrap">
        {email}
      </span>
    </div>
  );
}

export default AllowedCandidatesItem;
