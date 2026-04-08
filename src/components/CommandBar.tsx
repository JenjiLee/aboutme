interface Command {
  name: string;
  description: string;
  action: () => void;
}

interface CommandBarProps {
  commands: Command[];
  activeCommand?: string;
}

const CommandBar = ({ commands, activeCommand }: CommandBarProps) => {
  return (
    <div className="flex flex-wrap gap-2 mt-6 mb-2">
      <span className="text-muted-foreground text-xs self-center mr-1">可用命令:</span>
      {commands.map((cmd) => (
        <button
          key={cmd.name}
          onClick={cmd.action}
          className={`cmd-button ${
            activeCommand === cmd.name
              ? "!bg-primary !text-primary-foreground !border-primary"
              : ""
          }`}
          title={cmd.description}
        >
          ./{cmd.name}
        </button>
      ))}
    </div>
  );
};

export default CommandBar;
