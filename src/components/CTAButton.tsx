
interface CTAButtonProps {
    label: string;
    page_location: string;
    button_name?: string;
    className?: string;
    style?: object
  }
  
  export const CTAButton: React.FC<CTAButtonProps> = ({
    label = "Agenda una Visita",
    page_location = "tel:+523311930011",
    className = "",
    style = {}
  }) => {
    const handleClick = () => {
      window.location.href = page_location
    }
  
    const defaulClasses = "w-full bg-cyan-400 mx-auto w-full hover:bg-cyan-700 text-black items-center justify-center font-semibold rounded-lg text-lg flex items-center";
  
    return (
      <button
        style={style}
        onClick={handleClick} 
        className={`${defaulClasses} ${className}`}>
        {label}
      </button>
    )
  }

  export default CTAButton;