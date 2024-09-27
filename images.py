import os
import subprocess

def get_image_dimensions(file_path):
    try:
        # Run the `identify` command to get image dimensions
        result = subprocess.run(['identify', '-format', '%wx%h', file_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        dimensions = result.stdout.strip()
        
        if 'x' in dimensions:
            width, height = dimensions.split('x')
            return int(width), int(height)
        return None, None
    except Exception as e:
        print(f"Error processing file {file_path}: {e}")
        return None, None

def list_images_in_directory(directory):
    folder_path = os.path.join(os.getcwd(), directory)

    # Open the output file in write mode
    with open('images.txt', 'w') as output_file:
        # List all files in the directory
        for filename in os.listdir(folder_path):
            file_path = os.path.join(folder_path, filename)
            
            if os.path.isfile(file_path):
                width, height = get_image_dimensions(file_path)
                if width and height:
                    # Write the filename, width, and height to the output file
                    output_file.write(f"{filename}, {width}, {height}\n")
                else:
                    # If dimensions cannot be determined, note that in the output
                    output_file.write(f"Could not determine dimensions for {filename}\n")
        print("Image details have been written to image.txt")

if __name__ == "__main__":
    # Specify the relative folder 'photos/'
    list_images_in_directory('public/photos')
