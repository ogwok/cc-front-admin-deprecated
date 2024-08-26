
    import { TextInput } from 'flowbite-react';
    import React from 'react';
    
    interface GlobalSearchProps {
      value: string;
      onChange: (value: string) => void;
      placeholder?: string;
    }
    
    const GlobalSearch: React.FC<GlobalSearchProps> = ({
      value,
      onChange,
      placeholder = "Search all columns..."
    }) => {
      return (
        <div className="relative mt-1 lg:w-64 xl:w-96">
          <TextInput
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
          />
        </div>
      );
    };
    
    export default GlobalSearch;    
    