/**
 * Vehicle Window Image Data
 * Auto-generated collection of vehicle window images parsed from public/detail-glass folder
 *
 * Naming convention: [brand]-[model]-[startYear]-[endYear]-[windowCode]-[windowNumber]-[size]-[description]
 */

export interface VehicleWindowImage {
  filename: string;
  brand: string;
  model: string;
  submodels: string[];
  startYear: number;
  endYear: number;
  windowCode: string;
  windowNumber: string;
  size: {
    width: number;
    height: number;
    raw: string;
  };
  description: string;
  imagePath: string;
}

/**
 * Parses a filename according to the vehicle window naming convention
 */
export function parseVehicleWindowFilename(filename: string): VehicleWindowImage | null {
  // Remove file extension
  const nameWithoutExt = filename.replace(/\.(PNG|png|jpg|jpeg)$/i, '');

  const parts = nameWithoutExt.split('-');

  if (parts.length < 7) {
    console.warn(`Filename "${filename}" does not have enough parts`);
    return null;
  }

  // First part is always the brand
  const brand = parts[0];

  // Find the start year (first 4-digit number that looks like a year between 2000-2030)
  let startYearIndex = -1;
  let startYear = 0;
  let endYear = 0;

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i].trim();
    if (/^\d{4}$/.test(part)) {
      const year = parseInt(part, 10);
      if (year >= 2000 && year <= 2030) {
        startYearIndex = i;
        startYear = year;
        // Next part should be end year
        if (i + 1 < parts.length && /^\d{4}$/.test(parts[i + 1])) {
          endYear = parseInt(parts[i + 1], 10);
        }
        break;
      }
    }
  }

  if (startYearIndex === -1) {
    console.warn(`Could not find start year in filename "${filename}"`);
    return null;
  }

  // Everything between brand and start year is the model (can be multi-part)
  const modelParts = parts.slice(1, startYearIndex);
  const model = modelParts.join('-');
  const submodels = modelParts;

  // After end year: windowCode, windowNumber, size, description...
  const afterYearIndex = startYearIndex + 2; // +1 for end year

  if (parts.length < afterYearIndex + 3) {
    console.warn(`Filename "${filename}" missing window data after years`);
    return null;
  }

  const windowCode = parts[afterYearIndex];
  const windowNumber = parts[afterYearIndex + 1];
  const sizeStr = parts[afterYearIndex + 2];

  // Parse size (format: 1234x1234 or 1234X1234)
  const sizeMatch = sizeStr.match(/^(\d+)[xX](\d+)$/);
  let width = 0;
  let height = 0;

  if (sizeMatch) {
    width = parseInt(sizeMatch[1], 10);
    height = parseInt(sizeMatch[2], 10);
  } else {
    console.warn(`Could not parse size from "${sizeStr}" in filename "${filename}"`);
  }

  // Everything after size is the description
  const descriptionParts = parts.slice(afterYearIndex + 3);
  const description = descriptionParts.join('-');

  return {
    filename,
    brand,
    model,
    submodels,
    startYear,
    endYear,
    windowCode,
    windowNumber,
    size: {
      width,
      height,
      raw: sizeStr,
    },
    description,
    imagePath: `/detail-glass/${filename}`,
  };
}

/**
 * Collection of all vehicle window images
 */
export const vehicleWindowImages: VehicleWindowImage[] = [
  {
    "filename": "CHEVROLET-TORNADO-2022-2024-DB-13664-1346X491-MEDALLON.png",
    "brand": "CHEVROLET",
    "model": "TORNADO",
    "submodels": [
      "TORNADO"
    ],
    "startYear": 2022,
    "endYear": 2024,
    "windowCode": "DB",
    "windowNumber": "13664",
    "size": {
      "width": 1346,
      "height": 491,
      "raw": "1346X491"
    },
    "description": "MEDALLON",
    "imagePath": "/detail-glass/CHEVROLET-TORNADO-2022-2024-DB-13664-1346X491-MEDALLON.png"
  },
  {
    "filename": "CHEVROLET-TORNADO-2022-2024-DD-20056-778X465-PUERTA-DELANTERA-DERECHA.png",
    "brand": "CHEVROLET",
    "model": "TORNADO",
    "submodels": [
      "TORNADO"
    ],
    "startYear": 2022,
    "endYear": 2024,
    "windowCode": "DD",
    "windowNumber": "20056",
    "size": {
      "width": 778,
      "height": 465,
      "raw": "778X465"
    },
    "description": "PUERTA-DELANTERA-DERECHA",
    "imagePath": "/detail-glass/CHEVROLET-TORNADO-2022-2024-DD-20056-778X465-PUERTA-DELANTERA-DERECHA.png"
  },
  {
    "filename": "CHEVROLET-TORNADO-2022-2024-DD-20057-778X465-PUERTA-DELANTERA-IZQUIERDA.png",
    "brand": "CHEVROLET",
    "model": "TORNADO",
    "submodels": [
      "TORNADO"
    ],
    "startYear": 2022,
    "endYear": 2024,
    "windowCode": "DD",
    "windowNumber": "20057",
    "size": {
      "width": 778,
      "height": 465,
      "raw": "778X465"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA",
    "imagePath": "/detail-glass/CHEVROLET-TORNADO-2022-2024-DD-20057-778X465-PUERTA-DELANTERA-IZQUIERDA.png"
  },
  {
    "filename": "CHEVROLET-TORNADO-2022-2024-DQ-20058-812X445-COSTADO-TRASERO-DERECHO-A.png",
    "brand": "CHEVROLET",
    "model": "TORNADO",
    "submodels": [
      "TORNADO"
    ],
    "startYear": 2022,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "20058",
    "size": {
      "width": 812,
      "height": 445,
      "raw": "812X445"
    },
    "description": "COSTADO-TRASERO-DERECHO-A",
    "imagePath": "/detail-glass/CHEVROLET-TORNADO-2022-2024-DQ-20058-812X445-COSTADO-TRASERO-DERECHO-A.png"
  },
  {
    "filename": "CHEVROLET-TORNADO-2022-2024-DQ-20058-812X445-COSTADO-TRASERO-DERECHO-B.png",
    "brand": "CHEVROLET",
    "model": "TORNADO",
    "submodels": [
      "TORNADO"
    ],
    "startYear": 2022,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "20058",
    "size": {
      "width": 812,
      "height": 445,
      "raw": "812X445"
    },
    "description": "COSTADO-TRASERO-DERECHO-B",
    "imagePath": "/detail-glass/CHEVROLET-TORNADO-2022-2024-DQ-20058-812X445-COSTADO-TRASERO-DERECHO-B.png"
  },
  {
    "filename": "CHEVROLET-TORNADO-2022-2024-DQ-20059-812X445-COSTADO-TRASERO-IZQUIERDO-A.png",
    "brand": "CHEVROLET",
    "model": "TORNADO",
    "submodels": [
      "TORNADO"
    ],
    "startYear": 2022,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "20059",
    "size": {
      "width": 812,
      "height": 445,
      "raw": "812X445"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO-A",
    "imagePath": "/detail-glass/CHEVROLET-TORNADO-2022-2024-DQ-20059-812X445-COSTADO-TRASERO-IZQUIERDO-A.png"
  },
  {
    "filename": "CHEVROLET-TORNADO-2022-2024-DQ-20059-812X445-COSTADO-TRASERO-IZQUIERDO-B.png",
    "brand": "CHEVROLET",
    "model": "TORNADO",
    "submodels": [
      "TORNADO"
    ],
    "startYear": 2022,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "20059",
    "size": {
      "width": 812,
      "height": 445,
      "raw": "812X445"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO-B",
    "imagePath": "/detail-glass/CHEVROLET-TORNADO-2022-2024-DQ-20059-812X445-COSTADO-TRASERO-IZQUIERDO-B.png"
  },
  {
    "filename": "FIAT-DUCATO-2015-2024-DB-12565-660X829-MEDALLON-DERECHO.png",
    "brand": "FIAT",
    "model": "DUCATO",
    "submodels": [
      "DUCATO"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "DB",
    "windowNumber": "12565",
    "size": {
      "width": 660,
      "height": 829,
      "raw": "660X829"
    },
    "description": "MEDALLON-DERECHO",
    "imagePath": "/detail-glass/FIAT-DUCATO-2015-2024-DB-12565-660X829-MEDALLON-DERECHO.png"
  },
  {
    "filename": "FIAT-DUCATO-2015-2024-DB-12565-666X829-MEDALLON-DERECHO.png",
    "brand": "FIAT",
    "model": "DUCATO",
    "submodels": [
      "DUCATO"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "DB",
    "windowNumber": "12565",
    "size": {
      "width": 666,
      "height": 829,
      "raw": "666X829"
    },
    "description": "MEDALLON-DERECHO",
    "imagePath": "/detail-glass/FIAT-DUCATO-2015-2024-DB-12565-666X829-MEDALLON-DERECHO.png"
  },
  {
    "filename": "FIAT-DUCATO-2015-2024-DB-12566-660X829-MEDALLON-IZQUIERDO.png",
    "brand": "FIAT",
    "model": "DUCATO",
    "submodels": [
      "DUCATO"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "DB",
    "windowNumber": "12566",
    "size": {
      "width": 660,
      "height": 829,
      "raw": "660X829"
    },
    "description": "MEDALLON-IZQUIERDO",
    "imagePath": "/detail-glass/FIAT-DUCATO-2015-2024-DB-12566-660X829-MEDALLON-IZQUIERDO.png"
  },
  {
    "filename": "FIAT-DUCATO-2015-2024-DB-12566-666X829-MEDALLON-IZQUIERDO.png",
    "brand": "FIAT",
    "model": "DUCATO",
    "submodels": [
      "DUCATO"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "DB",
    "windowNumber": "12566",
    "size": {
      "width": 666,
      "height": 829,
      "raw": "666X829"
    },
    "description": "MEDALLON-IZQUIERDO",
    "imagePath": "/detail-glass/FIAT-DUCATO-2015-2024-DB-12566-666X829-MEDALLON-IZQUIERDO.png"
  },
  {
    "filename": "FIAT-DUCATO-2015-2024-FD-20022-1400X665-PUERTA-DELANTERA-DERECHA.png",
    "brand": "FIAT",
    "model": "DUCATO",
    "submodels": [
      "DUCATO"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "20022",
    "size": {
      "width": 1400,
      "height": 665,
      "raw": "1400X665"
    },
    "description": "PUERTA-DELANTERA-DERECHA",
    "imagePath": "/detail-glass/FIAT-DUCATO-2015-2024-FD-20022-1400X665-PUERTA-DELANTERA-DERECHA.png"
  },
  {
    "filename": "FIAT-DUCATO-2015-2024-FD-20060-1230X665-PUERTA-DELANTERA-DERECHA.png",
    "brand": "FIAT",
    "model": "DUCATO",
    "submodels": [
      "DUCATO"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "20060",
    "size": {
      "width": 1230,
      "height": 665,
      "raw": "1230X665"
    },
    "description": "PUERTA-DELANTERA-DERECHA",
    "imagePath": "/detail-glass/FIAT-DUCATO-2015-2024-FD-20060-1230X665-PUERTA-DELANTERA-DERECHA.png"
  },
  {
    "filename": "FIAT-DUCATO-2015-2024-FD-20061-1267X665-PUERTA-DELANTERA-IZQUIERDA.png",
    "brand": "FIAT",
    "model": "DUCATO",
    "submodels": [
      "DUCATO"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "20061",
    "size": {
      "width": 1267,
      "height": 665,
      "raw": "1267X665"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA",
    "imagePath": "/detail-glass/FIAT-DUCATO-2015-2024-FD-20061-1267X665-PUERTA-DELANTERA-IZQUIERDA.png"
  },
  {
    "filename": "FIAT-DUCATO-2015-2024-FQ-20062-1260X580-COSTADO-TRASERO-DERECHO.png",
    "brand": "FIAT",
    "model": "DUCATO",
    "submodels": [
      "DUCATO"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "20062",
    "size": {
      "width": 1260,
      "height": 580,
      "raw": "1260X580"
    },
    "description": "COSTADO-TRASERO-DERECHO",
    "imagePath": "/detail-glass/FIAT-DUCATO-2015-2024-FQ-20062-1260X580-COSTADO-TRASERO-DERECHO.png"
  },
  {
    "filename": "FIAT-DUCATO-2015-2024-FQ-20063-1260X665-COSTADO-TRASERO-IZQUIERDO.png",
    "brand": "FIAT",
    "model": "DUCATO",
    "submodels": [
      "DUCATO"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "20063",
    "size": {
      "width": 1260,
      "height": 665,
      "raw": "1260X665"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO",
    "imagePath": "/detail-glass/FIAT-DUCATO-2015-2024-FQ-20063-1260X665-COSTADO-TRASERO-IZQUIERDO.png"
  },
  {
    "filename": "FIAT-DUCATO-MAXI-18-2015-2024- DB-12565-660X829-MEDALLON-DERECHO.png",
    "brand": "FIAT",
    "model": "DUCATO-MAXI-18",
    "submodels": [
      "DUCATO",
      "MAXI",
      "18"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": " DB",
    "windowNumber": "12565",
    "size": {
      "width": 660,
      "height": 829,
      "raw": "660X829"
    },
    "description": "MEDALLON-DERECHO",
    "imagePath": "/detail-glass/FIAT-DUCATO-MAXI-18-2015-2024- DB-12565-660X829-MEDALLON-DERECHO.png"
  },
  {
    "filename": "FIAT-DUCATO-MAXI-18-2015-2024-DB-12566-660X829-MEDALLON-IZQUIERDO.png",
    "brand": "FIAT",
    "model": "DUCATO-MAXI-18",
    "submodels": [
      "DUCATO",
      "MAXI",
      "18"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "DB",
    "windowNumber": "12566",
    "size": {
      "width": 660,
      "height": 829,
      "raw": "660X829"
    },
    "description": "MEDALLON-IZQUIERDO",
    "imagePath": "/detail-glass/FIAT-DUCATO-MAXI-18-2015-2024-DB-12566-660X829-MEDALLON-IZQUIERDO.png"
  },
  {
    "filename": "FIAT-DUCATO-MAXI-18-2015-2024-DQ-20025-1350X665-COSTADO-CENTRAL-IZQUIERDA-A.png",
    "brand": "FIAT",
    "model": "DUCATO-MAXI-18",
    "submodels": [
      "DUCATO",
      "MAXI",
      "18"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "20025",
    "size": {
      "width": 1350,
      "height": 665,
      "raw": "1350X665"
    },
    "description": "COSTADO-CENTRAL-IZQUIERDA-A",
    "imagePath": "/detail-glass/FIAT-DUCATO-MAXI-18-2015-2024-DQ-20025-1350X665-COSTADO-CENTRAL-IZQUIERDA-A.png"
  },
  {
    "filename": "FIAT-DUCATO-MAXI-18-2015-2024-DQ-20025-1350X665-COSTADO-CENTRAL-IZQUIERDA-B.png",
    "brand": "FIAT",
    "model": "DUCATO-MAXI-18",
    "submodels": [
      "DUCATO",
      "MAXI",
      "18"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "20025",
    "size": {
      "width": 1350,
      "height": 665,
      "raw": "1350X665"
    },
    "description": "COSTADO-CENTRAL-IZQUIERDA-B",
    "imagePath": "/detail-glass/FIAT-DUCATO-MAXI-18-2015-2024-DQ-20025-1350X665-COSTADO-CENTRAL-IZQUIERDA-B.png"
  },
  {
    "filename": "FIAT-DUCATO-MAXI-18-2015-2024-FD-20022-1400X665-PUERTA-DELANTERA-DERECHA-A.png",
    "brand": "FIAT",
    "model": "DUCATO-MAXI-18",
    "submodels": [
      "DUCATO",
      "MAXI",
      "18"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "20022",
    "size": {
      "width": 1400,
      "height": 665,
      "raw": "1400X665"
    },
    "description": "PUERTA-DELANTERA-DERECHA-A",
    "imagePath": "/detail-glass/FIAT-DUCATO-MAXI-18-2015-2024-FD-20022-1400X665-PUERTA-DELANTERA-DERECHA-A.png"
  },
  {
    "filename": "FIAT-DUCATO-MAXI-18-2015-2024-FD-20022-1400X665-PUERTA-DELANTERA-DERECHA-B.png",
    "brand": "FIAT",
    "model": "DUCATO-MAXI-18",
    "submodels": [
      "DUCATO",
      "MAXI",
      "18"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "20022",
    "size": {
      "width": 1400,
      "height": 665,
      "raw": "1400X665"
    },
    "description": "PUERTA-DELANTERA-DERECHA-B",
    "imagePath": "/detail-glass/FIAT-DUCATO-MAXI-18-2015-2024-FD-20022-1400X665-PUERTA-DELANTERA-DERECHA-B.png"
  },
  {
    "filename": "FIAT-DUCATO-MAXI-18-2015-2024-FD-20023-1400X665-PUERTA-DELANTERA-IZQUIERDA-A.png",
    "brand": "FIAT",
    "model": "DUCATO-MAXI-18",
    "submodels": [
      "DUCATO",
      "MAXI",
      "18"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "20023",
    "size": {
      "width": 1400,
      "height": 665,
      "raw": "1400X665"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA-A",
    "imagePath": "/detail-glass/FIAT-DUCATO-MAXI-18-2015-2024-FD-20023-1400X665-PUERTA-DELANTERA-IZQUIERDA-A.png"
  },
  {
    "filename": "FIAT-DUCATO-MAXI-18-2015-2024-FD-20023-1400X665-PUERTA-DELANTERA-IZQUIERDA-B.png",
    "brand": "FIAT",
    "model": "DUCATO-MAXI-18",
    "submodels": [
      "DUCATO",
      "MAXI",
      "18"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "20023",
    "size": {
      "width": 1400,
      "height": 665,
      "raw": "1400X665"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA-B",
    "imagePath": "/detail-glass/FIAT-DUCATO-MAXI-18-2015-2024-FD-20023-1400X665-PUERTA-DELANTERA-IZQUIERDA-B.png"
  },
  {
    "filename": "FIAT-DUCATO-MAXI-18-2015-2024-FD-20026-1135X665-COSTADO-TRASERO-DERECHO.png",
    "brand": "FIAT",
    "model": "DUCATO-MAXI-18",
    "submodels": [
      "DUCATO",
      "MAXI",
      "18"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "20026",
    "size": {
      "width": 1135,
      "height": 665,
      "raw": "1135X665"
    },
    "description": "COSTADO-TRASERO-DERECHO",
    "imagePath": "/detail-glass/FIAT-DUCATO-MAXI-18-2015-2024-FD-20026-1135X665-COSTADO-TRASERO-DERECHO.png"
  },
  {
    "filename": "FIAT-DUCATO-MAXI-18-2015-2024-FQ-20024-1350X585-COSTADO-CENTRAL-DERECHO-A.png",
    "brand": "FIAT",
    "model": "DUCATO-MAXI-18",
    "submodels": [
      "DUCATO",
      "MAXI",
      "18"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "20024",
    "size": {
      "width": 1350,
      "height": 585,
      "raw": "1350X585"
    },
    "description": "COSTADO-CENTRAL-DERECHO-A",
    "imagePath": "/detail-glass/FIAT-DUCATO-MAXI-18-2015-2024-FQ-20024-1350X585-COSTADO-CENTRAL-DERECHO-A.png"
  },
  {
    "filename": "FIAT-DUCATO-MAXI-18-2015-2024-FQ-20024-1350X585-COSTADO-CENTRAL-DERECHO-B.png",
    "brand": "FIAT",
    "model": "DUCATO-MAXI-18",
    "submodels": [
      "DUCATO",
      "MAXI",
      "18"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "20024",
    "size": {
      "width": 1350,
      "height": 585,
      "raw": "1350X585"
    },
    "description": "COSTADO-CENTRAL-DERECHO-B",
    "imagePath": "/detail-glass/FIAT-DUCATO-MAXI-18-2015-2024-FQ-20024-1350X585-COSTADO-CENTRAL-DERECHO-B.png"
  },
  {
    "filename": "FIAT-DUCATO-MAXI-18-2015-2024-FQ-20026-1135X665-COSTADO-TRASERO-DERECHO.png",
    "brand": "FIAT",
    "model": "DUCATO-MAXI-18",
    "submodels": [
      "DUCATO",
      "MAXI",
      "18"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "20026",
    "size": {
      "width": 1135,
      "height": 665,
      "raw": "1135X665"
    },
    "description": "COSTADO-TRASERO-DERECHO",
    "imagePath": "/detail-glass/FIAT-DUCATO-MAXI-18-2015-2024-FQ-20026-1135X665-COSTADO-TRASERO-DERECHO.png"
  },
  {
    "filename": "FIAT-DUCATO-MAXI-18-2015-2024-FQ-20027-1135X665-COSTADO-TRASERO-IZQUIERDO-A.png",
    "brand": "FIAT",
    "model": "DUCATO-MAXI-18",
    "submodels": [
      "DUCATO",
      "MAXI",
      "18"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "20027",
    "size": {
      "width": 1135,
      "height": 665,
      "raw": "1135X665"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO-A",
    "imagePath": "/detail-glass/FIAT-DUCATO-MAXI-18-2015-2024-FQ-20027-1135X665-COSTADO-TRASERO-IZQUIERDO-A.png"
  },
  {
    "filename": "FIAT-DUCATO-MAXI-18-2015-2024-FQ-20027-1135X665-COSTADO-TRASERO-IZQUIERDO-B.png",
    "brand": "FIAT",
    "model": "DUCATO-MAXI-18",
    "submodels": [
      "DUCATO",
      "MAXI",
      "18"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "20027",
    "size": {
      "width": 1135,
      "height": 665,
      "raw": "1135X665"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO-B",
    "imagePath": "/detail-glass/FIAT-DUCATO-MAXI-18-2015-2024-FQ-20027-1135X665-COSTADO-TRASERO-IZQUIERDO-B.png"
  },
  {
    "filename": "FORD-TRANSIT-100HP8V-2015-2024-DB-12354-798X840-MEDALLON-DERECHO.png",
    "brand": "FORD",
    "model": "TRANSIT-100HP8V",
    "submodels": [
      "TRANSIT",
      "100HP8V"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "DB",
    "windowNumber": "12354",
    "size": {
      "width": 798,
      "height": 840,
      "raw": "798X840"
    },
    "description": "MEDALLON-DERECHO",
    "imagePath": "/detail-glass/FORD-TRANSIT-100HP8V-2015-2024-DB-12354-798X840-MEDALLON-DERECHO.png"
  },
  {
    "filename": "FORD-TRANSIT-100HP8V-2015-2024-DB-12355-798X840-MEDALLON-IZQUIERDO.png",
    "brand": "FORD",
    "model": "TRANSIT-100HP8V",
    "submodels": [
      "TRANSIT",
      "100HP8V"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "DB",
    "windowNumber": "12355",
    "size": {
      "width": 798,
      "height": 840,
      "raw": "798X840"
    },
    "description": "MEDALLON-IZQUIERDO",
    "imagePath": "/detail-glass/FORD-TRANSIT-100HP8V-2015-2024-DB-12355-798X840-MEDALLON-IZQUIERDO.png"
  },
  {
    "filename": "FORD-TRANSIT-100HP8V-2015-2024-DD-12342-1375X742-PUERTA-DELANTERA-DERECHA.png",
    "brand": "FORD",
    "model": "TRANSIT-100HP8V",
    "submodels": [
      "TRANSIT",
      "100HP8V"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "DD",
    "windowNumber": "12342",
    "size": {
      "width": 1375,
      "height": 742,
      "raw": "1375X742"
    },
    "description": "PUERTA-DELANTERA-DERECHA",
    "imagePath": "/detail-glass/FORD-TRANSIT-100HP8V-2015-2024-DD-12342-1375X742-PUERTA-DELANTERA-DERECHA.png"
  },
  {
    "filename": "FORD-TRANSIT-100HP8V-2015-2024-DD-12343-1375X742-PUERTA-DELANTERA-IZQUIERDA.png",
    "brand": "FORD",
    "model": "TRANSIT-100HP8V",
    "submodels": [
      "TRANSIT",
      "100HP8V"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "DD",
    "windowNumber": "12343",
    "size": {
      "width": 1375,
      "height": 742,
      "raw": "1375X742"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA",
    "imagePath": "/detail-glass/FORD-TRANSIT-100HP8V-2015-2024-DD-12343-1375X742-PUERTA-DELANTERA-IZQUIERDA.png"
  },
  {
    "filename": "FORD-TRANSIT-100HP8V-2015-2024-DQ-12346-980X725-CENTRAL-DERECHO.png",
    "brand": "FORD",
    "model": "TRANSIT-100HP8V",
    "submodels": [
      "TRANSIT",
      "100HP8V"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "12346",
    "size": {
      "width": 980,
      "height": 725,
      "raw": "980X725"
    },
    "description": "CENTRAL-DERECHO",
    "imagePath": "/detail-glass/FORD-TRANSIT-100HP8V-2015-2024-DQ-12346-980X725-CENTRAL-DERECHO.png"
  },
  {
    "filename": "FORD-TRANSIT-100HP8V-2015-2024-DQ-12347-980X725-CENTRAL-IZQUIERDA.png",
    "brand": "FORD",
    "model": "TRANSIT-100HP8V",
    "submodels": [
      "TRANSIT",
      "100HP8V"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "12347",
    "size": {
      "width": 980,
      "height": 725,
      "raw": "980X725"
    },
    "description": "CENTRAL-IZQUIERDA",
    "imagePath": "/detail-glass/FORD-TRANSIT-100HP8V-2015-2024-DQ-12347-980X725-CENTRAL-IZQUIERDA.png"
  },
  {
    "filename": "FORD-TRANSIT-100HP8V-2015-2024-DQ-12908-719X673-COSTADO-TRASERO-DERECHO.png",
    "brand": "FORD",
    "model": "TRANSIT-100HP8V",
    "submodels": [
      "TRANSIT",
      "100HP8V"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "12908",
    "size": {
      "width": 719,
      "height": 673,
      "raw": "719X673"
    },
    "description": "COSTADO-TRASERO-DERECHO",
    "imagePath": "/detail-glass/FORD-TRANSIT-100HP8V-2015-2024-DQ-12908-719X673-COSTADO-TRASERO-DERECHO.png"
  },
  {
    "filename": "FORD-TRANSIT-100HP8V-2015-2024-DQ-12909-719X673-COSTADO-TRASERO-IZQUIERDO.png",
    "brand": "FORD",
    "model": "TRANSIT-100HP8V",
    "submodels": [
      "TRANSIT",
      "100HP8V"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "12909",
    "size": {
      "width": 719,
      "height": 673,
      "raw": "719X673"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO",
    "imagePath": "/detail-glass/FORD-TRANSIT-100HP8V-2015-2024-DQ-12909-719X673-COSTADO-TRASERO-IZQUIERDO.png"
  },
  {
    "filename": "FORD-TRANSIT-110HP2L-2015-2024-DB-12354-798X840-MEDALLON-DERECHO.png",
    "brand": "FORD",
    "model": "TRANSIT-110HP2L",
    "submodels": [
      "TRANSIT",
      "110HP2L"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "DB",
    "windowNumber": "12354",
    "size": {
      "width": 798,
      "height": 840,
      "raw": "798X840"
    },
    "description": "MEDALLON-DERECHO",
    "imagePath": "/detail-glass/FORD-TRANSIT-110HP2L-2015-2024-DB-12354-798X840-MEDALLON-DERECHO.png"
  },
  {
    "filename": "FORD-TRANSIT-110HP2L-2015-2024-DB-12355-798X840-MEDALLON-IZQUIERDO.png",
    "brand": "FORD",
    "model": "TRANSIT-110HP2L",
    "submodels": [
      "TRANSIT",
      "110HP2L"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "DB",
    "windowNumber": "12355",
    "size": {
      "width": 798,
      "height": 840,
      "raw": "798X840"
    },
    "description": "MEDALLON-IZQUIERDO",
    "imagePath": "/detail-glass/FORD-TRANSIT-110HP2L-2015-2024-DB-12355-798X840-MEDALLON-IZQUIERDO.png"
  },
  {
    "filename": "FORD-TRANSIT-110HP2L-2015-2024-DD-12342-1375X742-PUERTA-DELANTERA-DERECHA.png",
    "brand": "FORD",
    "model": "TRANSIT-110HP2L",
    "submodels": [
      "TRANSIT",
      "110HP2L"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "DD",
    "windowNumber": "12342",
    "size": {
      "width": 1375,
      "height": 742,
      "raw": "1375X742"
    },
    "description": "PUERTA-DELANTERA-DERECHA",
    "imagePath": "/detail-glass/FORD-TRANSIT-110HP2L-2015-2024-DD-12342-1375X742-PUERTA-DELANTERA-DERECHA.png"
  },
  {
    "filename": "FORD-TRANSIT-110HP2L-2015-2024-DD-12343-1375X742-PUERTA-DELANTERA-IZQUIERDA.png",
    "brand": "FORD",
    "model": "TRANSIT-110HP2L",
    "submodels": [
      "TRANSIT",
      "110HP2L"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "DD",
    "windowNumber": "12343",
    "size": {
      "width": 1375,
      "height": 742,
      "raw": "1375X742"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA",
    "imagePath": "/detail-glass/FORD-TRANSIT-110HP2L-2015-2024-DD-12343-1375X742-PUERTA-DELANTERA-IZQUIERDA.png"
  },
  {
    "filename": "FORD-TRANSIT-110HP2L-2015-2024-DQ-12346-980X725-CENTRAL-DERECHA.png",
    "brand": "FORD",
    "model": "TRANSIT-110HP2L",
    "submodels": [
      "TRANSIT",
      "110HP2L"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "12346",
    "size": {
      "width": 980,
      "height": 725,
      "raw": "980X725"
    },
    "description": "CENTRAL-DERECHA",
    "imagePath": "/detail-glass/FORD-TRANSIT-110HP2L-2015-2024-DQ-12346-980X725-CENTRAL-DERECHA.png"
  },
  {
    "filename": "FORD-TRANSIT-110HP2L-2015-2024-DQ-12347-980X725-CENTRAL-IZQUIERDA.png",
    "brand": "FORD",
    "model": "TRANSIT-110HP2L",
    "submodels": [
      "TRANSIT",
      "110HP2L"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "12347",
    "size": {
      "width": 980,
      "height": 725,
      "raw": "980X725"
    },
    "description": "CENTRAL-IZQUIERDA",
    "imagePath": "/detail-glass/FORD-TRANSIT-110HP2L-2015-2024-DQ-12347-980X725-CENTRAL-IZQUIERDA.png"
  },
  {
    "filename": "FORD-TRANSIT-110HP2L-2015-2024-DQ-12352-1374X715-COSTADO-TRASERO-DERECHO.png",
    "brand": "FORD",
    "model": "TRANSIT-110HP2L",
    "submodels": [
      "TRANSIT",
      "110HP2L"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "12352",
    "size": {
      "width": 1374,
      "height": 715,
      "raw": "1374X715"
    },
    "description": "COSTADO-TRASERO-DERECHO",
    "imagePath": "/detail-glass/FORD-TRANSIT-110HP2L-2015-2024-DQ-12352-1374X715-COSTADO-TRASERO-DERECHO.png"
  },
  {
    "filename": "FORD-TRANSIT-110HP2L-2015-2024-DQ-12352L-1400X715-COSTADO-TRASERO-DERECHO.png",
    "brand": "FORD",
    "model": "TRANSIT-110HP2L",
    "submodels": [
      "TRANSIT",
      "110HP2L"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "12352L",
    "size": {
      "width": 1400,
      "height": 715,
      "raw": "1400X715"
    },
    "description": "COSTADO-TRASERO-DERECHO",
    "imagePath": "/detail-glass/FORD-TRANSIT-110HP2L-2015-2024-DQ-12352L-1400X715-COSTADO-TRASERO-DERECHO.png"
  },
  {
    "filename": "FORD-TRANSIT-110HP2L-2015-2024-DQ-12353-1374X715-COSTADO-TRASERO-IZQUIERDO.png",
    "brand": "FORD",
    "model": "TRANSIT-110HP2L",
    "submodels": [
      "TRANSIT",
      "110HP2L"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "12353",
    "size": {
      "width": 1374,
      "height": 715,
      "raw": "1374X715"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO",
    "imagePath": "/detail-glass/FORD-TRANSIT-110HP2L-2015-2024-DQ-12353-1374X715-COSTADO-TRASERO-IZQUIERDO.png"
  },
  {
    "filename": "FORD-TRANSIT-110HP2L-2015-2024-DQ-12353L-1400X715-COSTADO-TRASERO-IZQUIERDO.png",
    "brand": "FORD",
    "model": "TRANSIT-110HP2L",
    "submodels": [
      "TRANSIT",
      "110HP2L"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "12353L",
    "size": {
      "width": 1400,
      "height": 715,
      "raw": "1400X715"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO",
    "imagePath": "/detail-glass/FORD-TRANSIT-110HP2L-2015-2024-DQ-12353L-1400X715-COSTADO-TRASERO-IZQUIERDO.png"
  },
  {
    "filename": "FORD-TRANSIT-2015-2023-DB-12354-798X840-MEDALLON-DERECHO.png",
    "brand": "FORD",
    "model": "TRANSIT",
    "submodels": [
      "TRANSIT"
    ],
    "startYear": 2015,
    "endYear": 2023,
    "windowCode": "DB",
    "windowNumber": "12354",
    "size": {
      "width": 798,
      "height": 840,
      "raw": "798X840"
    },
    "description": "MEDALLON-DERECHO",
    "imagePath": "/detail-glass/FORD-TRANSIT-2015-2023-DB-12354-798X840-MEDALLON-DERECHO.png"
  },
  {
    "filename": "FORD-TRANSIT-2015-2023-DB-12355-798X840-MEDALLON-IZQUIERDO.png",
    "brand": "FORD",
    "model": "TRANSIT",
    "submodels": [
      "TRANSIT"
    ],
    "startYear": 2015,
    "endYear": 2023,
    "windowCode": "DB",
    "windowNumber": "12355",
    "size": {
      "width": 798,
      "height": 840,
      "raw": "798X840"
    },
    "description": "MEDALLON-IZQUIERDO",
    "imagePath": "/detail-glass/FORD-TRANSIT-2015-2023-DB-12355-798X840-MEDALLON-IZQUIERDO.png"
  },
  {
    "filename": "FORD-TRANSIT-2015-2023-DD-12342-1383X731-PUERTA-DELANTERA-DERECHA.png",
    "brand": "FORD",
    "model": "TRANSIT",
    "submodels": [
      "TRANSIT"
    ],
    "startYear": 2015,
    "endYear": 2023,
    "windowCode": "DD",
    "windowNumber": "12342",
    "size": {
      "width": 1383,
      "height": 731,
      "raw": "1383X731"
    },
    "description": "PUERTA-DELANTERA-DERECHA",
    "imagePath": "/detail-glass/FORD-TRANSIT-2015-2023-DD-12342-1383X731-PUERTA-DELANTERA-DERECHA.png"
  },
  {
    "filename": "FORD-TRANSIT-83HP2L-2015-2024-DB-12354-798X840-MEDALLON-DERECHO.png",
    "brand": "FORD",
    "model": "TRANSIT-83HP2L",
    "submodels": [
      "TRANSIT",
      "83HP2L"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "DB",
    "windowNumber": "12354",
    "size": {
      "width": 798,
      "height": 840,
      "raw": "798X840"
    },
    "description": "MEDALLON-DERECHO",
    "imagePath": "/detail-glass/FORD-TRANSIT-83HP2L-2015-2024-DB-12354-798X840-MEDALLON-DERECHO.png"
  },
  {
    "filename": "FORD-TRANSIT-83HP2L-2015-2024-DB-12355-798X840-MEDALLON-IZQUIERDO.png",
    "brand": "FORD",
    "model": "TRANSIT-83HP2L",
    "submodels": [
      "TRANSIT",
      "83HP2L"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "DB",
    "windowNumber": "12355",
    "size": {
      "width": 798,
      "height": 840,
      "raw": "798X840"
    },
    "description": "MEDALLON-IZQUIERDO",
    "imagePath": "/detail-glass/FORD-TRANSIT-83HP2L-2015-2024-DB-12355-798X840-MEDALLON-IZQUIERDO.png"
  },
  {
    "filename": "FORD-TRANSIT-83HP2L-2015-2024-DD-12342-1375X742-PUERTA-DELANTERA-DERECHA.png",
    "brand": "FORD",
    "model": "TRANSIT-83HP2L",
    "submodels": [
      "TRANSIT",
      "83HP2L"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "DD",
    "windowNumber": "12342",
    "size": {
      "width": 1375,
      "height": 742,
      "raw": "1375X742"
    },
    "description": "PUERTA-DELANTERA-DERECHA",
    "imagePath": "/detail-glass/FORD-TRANSIT-83HP2L-2015-2024-DD-12342-1375X742-PUERTA-DELANTERA-DERECHA.png"
  },
  {
    "filename": "FORD-TRANSIT-83HP2L-2015-2024-DD-12343-1375X742-PUERTA-DELANTERA-IZQUIERDA.png",
    "brand": "FORD",
    "model": "TRANSIT-83HP2L",
    "submodels": [
      "TRANSIT",
      "83HP2L"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "DD",
    "windowNumber": "12343",
    "size": {
      "width": 1375,
      "height": 742,
      "raw": "1375X742"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA",
    "imagePath": "/detail-glass/FORD-TRANSIT-83HP2L-2015-2024-DD-12343-1375X742-PUERTA-DELANTERA-IZQUIERDA.png"
  },
  {
    "filename": "FORD-TRANSIT-83HP2L-2015-2024-DQ-12344-1375X742-COSTADO-TRASERO-DERECHO.png",
    "brand": "FORD",
    "model": "TRANSIT-83HP2L",
    "submodels": [
      "TRANSIT",
      "83HP2L"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "12344",
    "size": {
      "width": 1375,
      "height": 742,
      "raw": "1375X742"
    },
    "description": "COSTADO-TRASERO-DERECHO",
    "imagePath": "/detail-glass/FORD-TRANSIT-83HP2L-2015-2024-DQ-12344-1375X742-COSTADO-TRASERO-DERECHO.png"
  },
  {
    "filename": "FORD-TRANSIT-83HP2L-2015-2024-DQ-12345-1214X715-COSTADO-TRASERO-IZQUIERDO.png",
    "brand": "FORD",
    "model": "TRANSIT-83HP2L",
    "submodels": [
      "TRANSIT",
      "83HP2L"
    ],
    "startYear": 2015,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "12345",
    "size": {
      "width": 1214,
      "height": 715,
      "raw": "1214X715"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO",
    "imagePath": "/detail-glass/FORD-TRANSIT-83HP2L-2015-2024-DQ-12345-1214X715-COSTADO-TRASERO-IZQUIERDO.png"
  },
  {
    "filename": "FORD-TRANSIT-CORTA-2007-2014-DD-11536-1175X630-PUERTA-DELANTERA-DERECHA.png",
    "brand": "FORD",
    "model": "TRANSIT-CORTA",
    "submodels": [
      "TRANSIT",
      "CORTA"
    ],
    "startYear": 2007,
    "endYear": 2014,
    "windowCode": "DD",
    "windowNumber": "11536",
    "size": {
      "width": 1175,
      "height": 630,
      "raw": "1175X630"
    },
    "description": "PUERTA-DELANTERA-DERECHA",
    "imagePath": "/detail-glass/FORD-TRANSIT-CORTA-2007-2014-DD-11536-1175X630-PUERTA-DELANTERA-DERECHA.png"
  },
  {
    "filename": "FORD-TRANSIT-CORTA-2007-2014-DD-11537-1185X630-PUERTA-DELANTERA-IZQUIERDA.png",
    "brand": "FORD",
    "model": "TRANSIT-CORTA",
    "submodels": [
      "TRANSIT",
      "CORTA"
    ],
    "startYear": 2007,
    "endYear": 2014,
    "windowCode": "DD",
    "windowNumber": "11537",
    "size": {
      "width": 1185,
      "height": 630,
      "raw": "1185X630"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA",
    "imagePath": "/detail-glass/FORD-TRANSIT-CORTA-2007-2014-DD-11537-1185X630-PUERTA-DELANTERA-IZQUIERDA.png"
  },
  {
    "filename": "FORD-TRANSIT-CORTA-2007-2014-DQ-11540-1205X625-TRASERA-DERECHA.png",
    "brand": "FORD",
    "model": "TRANSIT-CORTA",
    "submodels": [
      "TRANSIT",
      "CORTA"
    ],
    "startYear": 2007,
    "endYear": 2014,
    "windowCode": "DQ",
    "windowNumber": "11540",
    "size": {
      "width": 1205,
      "height": 625,
      "raw": "1205X625"
    },
    "description": "TRASERA-DERECHA",
    "imagePath": "/detail-glass/FORD-TRANSIT-CORTA-2007-2014-DQ-11540-1205X625-TRASERA-DERECHA.png"
  },
  {
    "filename": "FORD-TRANSIT-CORTA-2007-2014-DQ-11541-1205X625-COSTADO-TRASERA-IZQUIERDA.png",
    "brand": "FORD",
    "model": "TRANSIT-CORTA",
    "submodels": [
      "TRANSIT",
      "CORTA"
    ],
    "startYear": 2007,
    "endYear": 2014,
    "windowCode": "DQ",
    "windowNumber": "11541",
    "size": {
      "width": 1205,
      "height": 625,
      "raw": "1205X625"
    },
    "description": "COSTADO-TRASERA-IZQUIERDA",
    "imagePath": "/detail-glass/FORD-TRANSIT-CORTA-2007-2014-DQ-11541-1205X625-COSTADO-TRASERA-IZQUIERDA.png"
  },
  {
    "filename": "FORD-TRANSIT-CUSTOM-2017-2021-DB-12236-690X550-MEDALLON-DERECHO.png",
    "brand": "FORD",
    "model": "TRANSIT-CUSTOM",
    "submodels": [
      "TRANSIT",
      "CUSTOM"
    ],
    "startYear": 2017,
    "endYear": 2021,
    "windowCode": "DB",
    "windowNumber": "12236",
    "size": {
      "width": 690,
      "height": 550,
      "raw": "690X550"
    },
    "description": "MEDALLON-DERECHO",
    "imagePath": "/detail-glass/FORD-TRANSIT-CUSTOM-2017-2021-DB-12236-690X550-MEDALLON-DERECHO.png"
  },
  {
    "filename": "FORD-TRANSIT-CUSTOM-2017-2021-DB-12237-690X550-MEDALLON-IZQUIERDO.png",
    "brand": "FORD",
    "model": "TRANSIT-CUSTOM",
    "submodels": [
      "TRANSIT",
      "CUSTOM"
    ],
    "startYear": 2017,
    "endYear": 2021,
    "windowCode": "DB",
    "windowNumber": "12237",
    "size": {
      "width": 690,
      "height": 550,
      "raw": "690X550"
    },
    "description": "MEDALLON-IZQUIERDO",
    "imagePath": "/detail-glass/FORD-TRANSIT-CUSTOM-2017-2021-DB-12237-690X550-MEDALLON-IZQUIERDO.png"
  },
  {
    "filename": "FORD-TRANSIT-CUSTOM-2017-2021-FD-28414-567X1199-PUERTA-DELANTERA-DERECHA.png",
    "brand": "FORD",
    "model": "TRANSIT-CUSTOM",
    "submodels": [
      "TRANSIT",
      "CUSTOM"
    ],
    "startYear": 2017,
    "endYear": 2021,
    "windowCode": "FD",
    "windowNumber": "28414",
    "size": {
      "width": 567,
      "height": 1199,
      "raw": "567X1199"
    },
    "description": "PUERTA-DELANTERA-DERECHA",
    "imagePath": "/detail-glass/FORD-TRANSIT-CUSTOM-2017-2021-FD-28414-567X1199-PUERTA-DELANTERA-DERECHA.png"
  },
  {
    "filename": "FORD-TRANSIT-CUSTOM-2017-2021-FD-28415-567X1199-PUERTA-DELANTERA-IZQUIERDA.png",
    "brand": "FORD",
    "model": "TRANSIT-CUSTOM",
    "submodels": [
      "TRANSIT",
      "CUSTOM"
    ],
    "startYear": 2017,
    "endYear": 2021,
    "windowCode": "FD",
    "windowNumber": "28415",
    "size": {
      "width": 567,
      "height": 1199,
      "raw": "567X1199"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA",
    "imagePath": "/detail-glass/FORD-TRANSIT-CUSTOM-2017-2021-FD-28415-567X1199-PUERTA-DELANTERA-IZQUIERDA.png"
  },
  {
    "filename": "FORD-TRANSIT-CUSTOM-2017-2021-FQ-28416-1381X502-COSTADO-TRASERO-DERECHO.png",
    "brand": "FORD",
    "model": "TRANSIT-CUSTOM",
    "submodels": [
      "TRANSIT",
      "CUSTOM"
    ],
    "startYear": 2017,
    "endYear": 2021,
    "windowCode": "FQ",
    "windowNumber": "28416",
    "size": {
      "width": 1381,
      "height": 502,
      "raw": "1381X502"
    },
    "description": "COSTADO-TRASERO-DERECHO",
    "imagePath": "/detail-glass/FORD-TRANSIT-CUSTOM-2017-2021-FQ-28416-1381X502-COSTADO-TRASERO-DERECHO.png"
  },
  {
    "filename": "FORD-TRANSIT-CUSTOM-2017-2021-FQ-28417-1381X502-COSTADO-TRASERO-IZQUIERDO.png",
    "brand": "FORD",
    "model": "TRANSIT-CUSTOM",
    "submodels": [
      "TRANSIT",
      "CUSTOM"
    ],
    "startYear": 2017,
    "endYear": 2021,
    "windowCode": "FQ",
    "windowNumber": "28417",
    "size": {
      "width": 1381,
      "height": 502,
      "raw": "1381X502"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO",
    "imagePath": "/detail-glass/FORD-TRANSIT-CUSTOM-2017-2021-FQ-28417-1381X502-COSTADO-TRASERO-IZQUIERDO.png"
  },
  {
    "filename": "FORD-TRANSIT-CUSTOM-TDI-2016-2021-DB-12236-690X550-MEDALLON-DERECHO.png",
    "brand": "FORD",
    "model": "TRANSIT-CUSTOM-TDI",
    "submodels": [
      "TRANSIT",
      "CUSTOM",
      "TDI"
    ],
    "startYear": 2016,
    "endYear": 2021,
    "windowCode": "DB",
    "windowNumber": "12236",
    "size": {
      "width": 690,
      "height": 550,
      "raw": "690X550"
    },
    "description": "MEDALLON-DERECHO",
    "imagePath": "/detail-glass/FORD-TRANSIT-CUSTOM-TDI-2016-2021-DB-12236-690X550-MEDALLON-DERECHO.png"
  },
  {
    "filename": "FORD-TRANSIT-CUSTOM-TDI-2016-2021-DB-12237-690X550-MEDALLON-IZQUIERDO.png",
    "brand": "FORD",
    "model": "TRANSIT-CUSTOM-TDI",
    "submodels": [
      "TRANSIT",
      "CUSTOM",
      "TDI"
    ],
    "startYear": 2016,
    "endYear": 2021,
    "windowCode": "DB",
    "windowNumber": "12237",
    "size": {
      "width": 690,
      "height": 550,
      "raw": "690X550"
    },
    "description": "MEDALLON-IZQUIERDO",
    "imagePath": "/detail-glass/FORD-TRANSIT-CUSTOM-TDI-2016-2021-DB-12237-690X550-MEDALLON-IZQUIERDO.png"
  },
  {
    "filename": "FORD-TRANSIT-CUSTOM-TDI-2016-2021-FD-12230-1194X556-PUERTA-DELANTERA-DERECHA.png",
    "brand": "FORD",
    "model": "TRANSIT-CUSTOM-TDI",
    "submodels": [
      "TRANSIT",
      "CUSTOM",
      "TDI"
    ],
    "startYear": 2016,
    "endYear": 2021,
    "windowCode": "FD",
    "windowNumber": "12230",
    "size": {
      "width": 1194,
      "height": 556,
      "raw": "1194X556"
    },
    "description": "PUERTA-DELANTERA-DERECHA",
    "imagePath": "/detail-glass/FORD-TRANSIT-CUSTOM-TDI-2016-2021-FD-12230-1194X556-PUERTA-DELANTERA-DERECHA.png"
  },
  {
    "filename": "FORD-TRANSIT-CUSTOM-TDI-2016-2021-FD-12231-1144X556-PUERTA-DELANTERA-IZQUIERDA.png",
    "brand": "FORD",
    "model": "TRANSIT-CUSTOM-TDI",
    "submodels": [
      "TRANSIT",
      "CUSTOM",
      "TDI"
    ],
    "startYear": 2016,
    "endYear": 2021,
    "windowCode": "FD",
    "windowNumber": "12231",
    "size": {
      "width": 1144,
      "height": 556,
      "raw": "1144X556"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA",
    "imagePath": "/detail-glass/FORD-TRANSIT-CUSTOM-TDI-2016-2021-FD-12231-1144X556-PUERTA-DELANTERA-IZQUIERDA.png"
  },
  {
    "filename": "FORD-TRANSIT-CUSTOM-TDI-2016-2021-FQ-20095-1013X495-COSTADO-TRASERO-DERECHO.png",
    "brand": "FORD",
    "model": "TRANSIT-CUSTOM-TDI",
    "submodels": [
      "TRANSIT",
      "CUSTOM",
      "TDI"
    ],
    "startYear": 2016,
    "endYear": 2021,
    "windowCode": "FQ",
    "windowNumber": "20095",
    "size": {
      "width": 1013,
      "height": 495,
      "raw": "1013X495"
    },
    "description": "COSTADO-TRASERO-DERECHO",
    "imagePath": "/detail-glass/FORD-TRANSIT-CUSTOM-TDI-2016-2021-FQ-20095-1013X495-COSTADO-TRASERO-DERECHO.png"
  },
  {
    "filename": "FORD-TRANSIT-CUSTOM-TDI-2016-2021-FQ-20096-1065X500-COSTADO-TRASERO-IZQUIERDO.png",
    "brand": "FORD",
    "model": "TRANSIT-CUSTOM-TDI",
    "submodels": [
      "TRANSIT",
      "CUSTOM",
      "TDI"
    ],
    "startYear": 2016,
    "endYear": 2021,
    "windowCode": "FQ",
    "windowNumber": "20096",
    "size": {
      "width": 1065,
      "height": 500,
      "raw": "1065X500"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO",
    "imagePath": "/detail-glass/FORD-TRANSIT-CUSTOM-TDI-2016-2021-FQ-20096-1065X500-COSTADO-TRASERO-IZQUIERDO.png"
  },
  {
    "filename": "FORD-TRANSIT-EXTENDIDA-2007-2014-DD-20069-1420X630-PUERTA-DELANTERA-DERECHA.png",
    "brand": "FORD",
    "model": "TRANSIT-EXTENDIDA",
    "submodels": [
      "TRANSIT",
      "EXTENDIDA"
    ],
    "startYear": 2007,
    "endYear": 2014,
    "windowCode": "DD",
    "windowNumber": "20069",
    "size": {
      "width": 1420,
      "height": 630,
      "raw": "1420X630"
    },
    "description": "PUERTA-DELANTERA-DERECHA",
    "imagePath": "/detail-glass/FORD-TRANSIT-EXTENDIDA-2007-2014-DD-20069-1420X630-PUERTA-DELANTERA-DERECHA.png"
  },
  {
    "filename": "FORD-TRANSIT-EXTENDIDA-2007-2014-DD-20070-1420X630-PUERTA-DELANTERA-IZQUIERDA.png",
    "brand": "FORD",
    "model": "TRANSIT-EXTENDIDA",
    "submodels": [
      "TRANSIT",
      "EXTENDIDA"
    ],
    "startYear": 2007,
    "endYear": 2014,
    "windowCode": "DD",
    "windowNumber": "20070",
    "size": {
      "width": 1420,
      "height": 630,
      "raw": "1420X630"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA",
    "imagePath": "/detail-glass/FORD-TRANSIT-EXTENDIDA-2007-2014-DD-20070-1420X630-PUERTA-DELANTERA-IZQUIERDA.png"
  },
  {
    "filename": "FORD-TRANSIT-EXTENDIDA-2007-2014-DQ-20071-1310X575-TRASERA-DERECHA.png",
    "brand": "FORD",
    "model": "TRANSIT-EXTENDIDA",
    "submodels": [
      "TRANSIT",
      "EXTENDIDA"
    ],
    "startYear": 2007,
    "endYear": 2014,
    "windowCode": "DQ",
    "windowNumber": "20071",
    "size": {
      "width": 1310,
      "height": 575,
      "raw": "1310X575"
    },
    "description": "TRASERA-DERECHA",
    "imagePath": "/detail-glass/FORD-TRANSIT-EXTENDIDA-2007-2014-DQ-20071-1310X575-TRASERA-DERECHA.png"
  },
  {
    "filename": "FORD-TRANSIT-EXTENDIDA-2007-2014-DQ-20072-1310X630-COSTADO-TRASERA-IZQUIERDA.png",
    "brand": "FORD",
    "model": "TRANSIT-EXTENDIDA",
    "submodels": [
      "TRANSIT",
      "EXTENDIDA"
    ],
    "startYear": 2007,
    "endYear": 2014,
    "windowCode": "DQ",
    "windowNumber": "20072",
    "size": {
      "width": 1310,
      "height": 630,
      "raw": "1310X630"
    },
    "description": "COSTADO-TRASERA-IZQUIERDA",
    "imagePath": "/detail-glass/FORD-TRANSIT-EXTENDIDA-2007-2014-DQ-20072-1310X630-COSTADO-TRASERA-IZQUIERDA.png"
  },
  {
    "filename": "FOTON-VIEW-CS2-2014-2024-FB-030030-0X0-MEDALLON.png",
    "brand": "FOTON",
    "model": "VIEW-CS2",
    "submodels": [
      "VIEW",
      "CS2"
    ],
    "startYear": 2014,
    "endYear": 2024,
    "windowCode": "FB",
    "windowNumber": "030030",
    "size": {
      "width": 0,
      "height": 0,
      "raw": "0X0"
    },
    "description": "MEDALLON",
    "imagePath": "/detail-glass/FOTON-VIEW-CS2-2014-2024-FB-030030-0X0-MEDALLON.png"
  },
  {
    "filename": "FOTON-VIEW-CS2-2014-2024-FD-30032-1310X552-PUERTA-DELANTERA-DERECHA.png",
    "brand": "FOTON",
    "model": "VIEW-CS2",
    "submodels": [
      "VIEW",
      "CS2"
    ],
    "startYear": 2014,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "30032",
    "size": {
      "width": 1310,
      "height": 552,
      "raw": "1310X552"
    },
    "description": "PUERTA-DELANTERA-DERECHA",
    "imagePath": "/detail-glass/FOTON-VIEW-CS2-2014-2024-FD-30032-1310X552-PUERTA-DELANTERA-DERECHA.png"
  },
  {
    "filename": "FOTON-VIEW-CS2-2014-2024-FD-30033-1310X552-PUERTA-TRASERA-IZQUIERDO.png",
    "brand": "FOTON",
    "model": "VIEW-CS2",
    "submodels": [
      "VIEW",
      "CS2"
    ],
    "startYear": 2014,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "30033",
    "size": {
      "width": 1310,
      "height": 552,
      "raw": "1310X552"
    },
    "description": "PUERTA-TRASERA-IZQUIERDO",
    "imagePath": "/detail-glass/FOTON-VIEW-CS2-2014-2024-FD-30033-1310X552-PUERTA-TRASERA-IZQUIERDO.png"
  },
  {
    "filename": "FOTON-VIEW-CS2-2014-2024-FQ-30034-534X552-COSTADO-CENTRAL-DERECHO.png",
    "brand": "FOTON",
    "model": "VIEW-CS2",
    "submodels": [
      "VIEW",
      "CS2"
    ],
    "startYear": 2014,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "30034",
    "size": {
      "width": 534,
      "height": 552,
      "raw": "534X552"
    },
    "description": "COSTADO-CENTRAL-DERECHO",
    "imagePath": "/detail-glass/FOTON-VIEW-CS2-2014-2024-FQ-30034-534X552-COSTADO-CENTRAL-DERECHO.png"
  },
  {
    "filename": "FOTON-VIEW-CS2-2014-2024-FQ-30034-534X552-COSTADO-CENTRAL-IZQUIERDO.png",
    "brand": "FOTON",
    "model": "VIEW-CS2",
    "submodels": [
      "VIEW",
      "CS2"
    ],
    "startYear": 2014,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "30034",
    "size": {
      "width": 534,
      "height": 552,
      "raw": "534X552"
    },
    "description": "COSTADO-CENTRAL-IZQUIERDO",
    "imagePath": "/detail-glass/FOTON-VIEW-CS2-2014-2024-FQ-30034-534X552-COSTADO-CENTRAL-IZQUIERDO.png"
  },
  {
    "filename": "FOTON-VIEW-CS2-2014-2024-FQ-30036-1366X552-COSTADO-TRASERO-DERECHO.png",
    "brand": "FOTON",
    "model": "VIEW-CS2",
    "submodels": [
      "VIEW",
      "CS2"
    ],
    "startYear": 2014,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "30036",
    "size": {
      "width": 1366,
      "height": 552,
      "raw": "1366X552"
    },
    "description": "COSTADO-TRASERO-DERECHO",
    "imagePath": "/detail-glass/FOTON-VIEW-CS2-2014-2024-FQ-30036-1366X552-COSTADO-TRASERO-DERECHO.png"
  },
  {
    "filename": "FOTON-VIEW-CS2-2014-2024-FQ-30037-1366X552-COSTADO-TRASERO-IZQUIERDO.png",
    "brand": "FOTON",
    "model": "VIEW-CS2",
    "submodels": [
      "VIEW",
      "CS2"
    ],
    "startYear": 2014,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "30037",
    "size": {
      "width": 1366,
      "height": 552,
      "raw": "1366X552"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO",
    "imagePath": "/detail-glass/FOTON-VIEW-CS2-2014-2024-FQ-30037-1366X552-COSTADO-TRASERO-IZQUIERDO.png"
  },
  {
    "filename": "HYUNDAI-SOLATI-H350-2024-2025-FD-20145-1382X733-PUERTA-DELANTERA-IZQUIERDO.png",
    "brand": "HYUNDAI",
    "model": "SOLATI-H350",
    "submodels": [
      "SOLATI",
      "H350"
    ],
    "startYear": 2024,
    "endYear": 2025,
    "windowCode": "FD",
    "windowNumber": "20145",
    "size": {
      "width": 1382,
      "height": 733,
      "raw": "1382X733"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDO",
    "imagePath": "/detail-glass/HYUNDAI-SOLATI-H350-2024-2025-FD-20145-1382X733-PUERTA-DELANTERA-IZQUIERDO.png"
  },
  {
    "filename": "HYUNDAI-SOLATI-H350-2024-2025-FD-20146-1382X733-COSTADO-TRASERO-IZQUIERDO.png",
    "brand": "HYUNDAI",
    "model": "SOLATI-H350",
    "submodels": [
      "SOLATI",
      "H350"
    ],
    "startYear": 2024,
    "endYear": 2025,
    "windowCode": "FD",
    "windowNumber": "20146",
    "size": {
      "width": 1382,
      "height": 733,
      "raw": "1382X733"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO",
    "imagePath": "/detail-glass/HYUNDAI-SOLATI-H350-2024-2025-FD-20146-1382X733-COSTADO-TRASERO-IZQUIERDO.png"
  },
  {
    "filename": "HYUNDAI-SOLATI-H350-2024-2025-FQ-20147-1415X665-COSTADO-CENTRAL-IZQUIERDO.png",
    "brand": "HYUNDAI",
    "model": "SOLATI-H350",
    "submodels": [
      "SOLATI",
      "H350"
    ],
    "startYear": 2024,
    "endYear": 2025,
    "windowCode": "FQ",
    "windowNumber": "20147",
    "size": {
      "width": 1415,
      "height": 665,
      "raw": "1415X665"
    },
    "description": "COSTADO-CENTRAL-IZQUIERDO",
    "imagePath": "/detail-glass/HYUNDAI-SOLATI-H350-2024-2025-FQ-20147-1415X665-COSTADO-CENTRAL-IZQUIERDO.png"
  },
  {
    "filename": "HYUNDAI-SOLATI-H350-2024-2025-FQ-20148-1415X665-COSTADO-CENTRAL-IZQUIERDO.png",
    "brand": "HYUNDAI",
    "model": "SOLATI-H350",
    "submodels": [
      "SOLATI",
      "H350"
    ],
    "startYear": 2024,
    "endYear": 2025,
    "windowCode": "FQ",
    "windowNumber": "20148",
    "size": {
      "width": 1415,
      "height": 665,
      "raw": "1415X665"
    },
    "description": "COSTADO-CENTRAL-IZQUIERDO",
    "imagePath": "/detail-glass/HYUNDAI-SOLATI-H350-2024-2025-FQ-20148-1415X665-COSTADO-CENTRAL-IZQUIERDO.png"
  },
  {
    "filename": "HYUNDAI-SOLATI-H350-2024-2025-FQ-20149-580X733-COSTADO-TRASERO-IZQUIERDO.png",
    "brand": "HYUNDAI",
    "model": "SOLATI-H350",
    "submodels": [
      "SOLATI",
      "H350"
    ],
    "startYear": 2024,
    "endYear": 2025,
    "windowCode": "FQ",
    "windowNumber": "20149",
    "size": {
      "width": 580,
      "height": 733,
      "raw": "580X733"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO",
    "imagePath": "/detail-glass/HYUNDAI-SOLATI-H350-2024-2025-FQ-20149-580X733-COSTADO-TRASERO-IZQUIERDO.png"
  },
  {
    "filename": "HYUNDAI-SOLATI-H350-2024-2025-FQ-20150-580X665-PUERTA-DELANTERA-IZQUIERDO.png",
    "brand": "HYUNDAI",
    "model": "SOLATI-H350",
    "submodels": [
      "SOLATI",
      "H350"
    ],
    "startYear": 2024,
    "endYear": 2025,
    "windowCode": "FQ",
    "windowNumber": "20150",
    "size": {
      "width": 580,
      "height": 665,
      "raw": "580X665"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDO",
    "imagePath": "/detail-glass/HYUNDAI-SOLATI-H350-2024-2025-FQ-20150-580X665-PUERTA-DELANTERA-IZQUIERDO.png"
  },
  {
    "filename": "HYUNDAI-STAREX-2023-2024-DQ-20035-947X412-TRASERA-IZQUIERDA.png",
    "brand": "HYUNDAI",
    "model": "STAREX",
    "submodels": [
      "STAREX"
    ],
    "startYear": 2023,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "20035",
    "size": {
      "width": 947,
      "height": 412,
      "raw": "947X412"
    },
    "description": "TRASERA-IZQUIERDA",
    "imagePath": "/detail-glass/HYUNDAI-STAREX-2023-2024-DQ-20035-947X412-TRASERA-IZQUIERDA.png"
  },
  {
    "filename": "HYUNDAI-STAREX-2023-2024-FD-20032-1054X515-PUERTA-DELANTERA-DERECHA.png",
    "brand": "HYUNDAI",
    "model": "STAREX",
    "submodels": [
      "STAREX"
    ],
    "startYear": 2023,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "20032",
    "size": {
      "width": 1054,
      "height": 515,
      "raw": "1054X515"
    },
    "description": "PUERTA-DELANTERA-DERECHA",
    "imagePath": "/detail-glass/HYUNDAI-STAREX-2023-2024-FD-20032-1054X515-PUERTA-DELANTERA-DERECHA.png"
  },
  {
    "filename": "HYUNDAI-STAREX-2023-2024-FD-20033-1054X515-PUERTA-DELANTERA-IZQUIERDA.png",
    "brand": "HYUNDAI",
    "model": "STAREX",
    "submodels": [
      "STAREX"
    ],
    "startYear": 2023,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "20033",
    "size": {
      "width": 1054,
      "height": 515,
      "raw": "1054X515"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA",
    "imagePath": "/detail-glass/HYUNDAI-STAREX-2023-2024-FD-20033-1054X515-PUERTA-DELANTERA-IZQUIERDA.png"
  },
  {
    "filename": "HYUNDAI-STAREX-2023-2024-FQ-20034-947X412-TRASERA-DERECHA.png",
    "brand": "HYUNDAI",
    "model": "STAREX",
    "submodels": [
      "STAREX"
    ],
    "startYear": 2023,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "20034",
    "size": {
      "width": 947,
      "height": 412,
      "raw": "947X412"
    },
    "description": "TRASERA-DERECHA",
    "imagePath": "/detail-glass/HYUNDAI-STAREX-2023-2024-FQ-20034-947X412-TRASERA-DERECHA.png"
  },
  {
    "filename": "JACK-SUNRAY-2023-2024-FB-20020-777X750-MEDALLON-DERECHO.png",
    "brand": "JACK",
    "model": "SUNRAY",
    "submodels": [
      "SUNRAY"
    ],
    "startYear": 2023,
    "endYear": 2024,
    "windowCode": "FB",
    "windowNumber": "20020",
    "size": {
      "width": 777,
      "height": 750,
      "raw": "777X750"
    },
    "description": "MEDALLON-DERECHO",
    "imagePath": "/detail-glass/JACK-SUNRAY-2023-2024-FB-20020-777X750-MEDALLON-DERECHO.png"
  },
  {
    "filename": "JACK-SUNRAY-2023-2024-FB-20051-777X750-MEDALLON-IZQUIERDO.png",
    "brand": "JACK",
    "model": "SUNRAY",
    "submodels": [
      "SUNRAY"
    ],
    "startYear": 2023,
    "endYear": 2024,
    "windowCode": "FB",
    "windowNumber": "20051",
    "size": {
      "width": 777,
      "height": 750,
      "raw": "777X750"
    },
    "description": "MEDALLON-IZQUIERDO",
    "imagePath": "/detail-glass/JACK-SUNRAY-2023-2024-FB-20051-777X750-MEDALLON-IZQUIERDO.png"
  },
  {
    "filename": "JACK-SUNRAY-2023-2024-FD-20044-1085X670-PUERTA-DELANTERA-DERECHA.png",
    "brand": "JACK",
    "model": "SUNRAY",
    "submodels": [
      "SUNRAY"
    ],
    "startYear": 2023,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "20044",
    "size": {
      "width": 1085,
      "height": 670,
      "raw": "1085X670"
    },
    "description": "PUERTA-DELANTERA-DERECHA",
    "imagePath": "/detail-glass/JACK-SUNRAY-2023-2024-FD-20044-1085X670-PUERTA-DELANTERA-DERECHA.png"
  },
  {
    "filename": "JACK-SUNRAY-2023-2024-FD-20045-1085X670-PUERTA-DELANTERA-IZQUIERDA.png",
    "brand": "JACK",
    "model": "SUNRAY",
    "submodels": [
      "SUNRAY"
    ],
    "startYear": 2023,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "20045",
    "size": {
      "width": 1085,
      "height": 670,
      "raw": "1085X670"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA",
    "imagePath": "/detail-glass/JACK-SUNRAY-2023-2024-FD-20045-1085X670-PUERTA-DELANTERA-IZQUIERDA.png"
  },
  {
    "filename": "JACK-SUNRAY-2023-2024-FQ-20046-1140X670-COSTADO-CENTRAL-DERECHO.png",
    "brand": "JACK",
    "model": "SUNRAY",
    "submodels": [
      "SUNRAY"
    ],
    "startYear": 2023,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "20046",
    "size": {
      "width": 1140,
      "height": 670,
      "raw": "1140X670"
    },
    "description": "COSTADO-CENTRAL-DERECHO",
    "imagePath": "/detail-glass/JACK-SUNRAY-2023-2024-FQ-20046-1140X670-COSTADO-CENTRAL-DERECHO.png"
  },
  {
    "filename": "JACK-SUNRAY-2023-2024-FQ-20047-1140X675-COSTADO-CENTRAL-DERECHO.png",
    "brand": "JACK",
    "model": "SUNRAY",
    "submodels": [
      "SUNRAY"
    ],
    "startYear": 2023,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "20047",
    "size": {
      "width": 1140,
      "height": 675,
      "raw": "1140X675"
    },
    "description": "COSTADO-CENTRAL-DERECHO",
    "imagePath": "/detail-glass/JACK-SUNRAY-2023-2024-FQ-20047-1140X675-COSTADO-CENTRAL-DERECHO.png"
  },
  {
    "filename": "JACK-SUNRAY-2023-2024-FQ-20048-1130X675-COSTADO-TRASERO-DERECHO.png",
    "brand": "JACK",
    "model": "SUNRAY",
    "submodels": [
      "SUNRAY"
    ],
    "startYear": 2023,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "20048",
    "size": {
      "width": 1130,
      "height": 675,
      "raw": "1130X675"
    },
    "description": "COSTADO-TRASERO-DERECHO",
    "imagePath": "/detail-glass/JACK-SUNRAY-2023-2024-FQ-20048-1130X675-COSTADO-TRASERO-DERECHO.png"
  },
  {
    "filename": "JACK-SUNRAY-2023-2024-FQ-20049-1130X675-COSTADO-TRASERO-IZQUIERDO.png",
    "brand": "JACK",
    "model": "SUNRAY",
    "submodels": [
      "SUNRAY"
    ],
    "startYear": 2023,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "20049",
    "size": {
      "width": 1130,
      "height": 675,
      "raw": "1130X675"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO",
    "imagePath": "/detail-glass/JACK-SUNRAY-2023-2024-FQ-20049-1130X675-COSTADO-TRASERO-IZQUIERDO.png"
  },
  {
    "filename": "MERCEDES-SPRINTER-2008-2024-ACCH0009-DR-817X799-MEDALLON-DERECHO.png",
    "brand": "MERCEDES",
    "model": "SPRINTER",
    "submodels": [
      "SPRINTER"
    ],
    "startYear": 2008,
    "endYear": 2024,
    "windowCode": "ACCH0009",
    "windowNumber": "DR",
    "size": {
      "width": 817,
      "height": 799,
      "raw": "817X799"
    },
    "description": "MEDALLON-DERECHO",
    "imagePath": "/detail-glass/MERCEDES-SPRINTER-2008-2024-ACCH0009-DR-817X799-MEDALLON-DERECHO.png"
  },
  {
    "filename": "MERCEDES-SPRINTER-2008-2024-ACCH0009-IZ-817X799-MEDALLON-IZQUIERDO.png",
    "brand": "MERCEDES",
    "model": "SPRINTER",
    "submodels": [
      "SPRINTER"
    ],
    "startYear": 2008,
    "endYear": 2024,
    "windowCode": "ACCH0009",
    "windowNumber": "IZ",
    "size": {
      "width": 817,
      "height": 799,
      "raw": "817X799"
    },
    "description": "MEDALLON-IZQUIERDO",
    "imagePath": "/detail-glass/MERCEDES-SPRINTER-2008-2024-ACCH0009-IZ-817X799-MEDALLON-IZQUIERDO.png"
  },
  {
    "filename": "MERCEDES-SPRINTER-2008-2024-DB-11418-817X799-MEDALLON-DERECHO.png",
    "brand": "MERCEDES",
    "model": "SPRINTER",
    "submodels": [
      "SPRINTER"
    ],
    "startYear": 2008,
    "endYear": 2024,
    "windowCode": "DB",
    "windowNumber": "11418",
    "size": {
      "width": 817,
      "height": 799,
      "raw": "817X799"
    },
    "description": "MEDALLON-DERECHO",
    "imagePath": "/detail-glass/MERCEDES-SPRINTER-2008-2024-DB-11418-817X799-MEDALLON-DERECHO.png"
  },
  {
    "filename": "MERCEDES-SPRINTER-2008-2024-DB-11419-817X799-MEDALLON-IZQUIERDO.png",
    "brand": "MERCEDES",
    "model": "SPRINTER",
    "submodels": [
      "SPRINTER"
    ],
    "startYear": 2008,
    "endYear": 2024,
    "windowCode": "DB",
    "windowNumber": "11419",
    "size": {
      "width": 817,
      "height": 799,
      "raw": "817X799"
    },
    "description": "MEDALLON-IZQUIERDO",
    "imagePath": "/detail-glass/MERCEDES-SPRINTER-2008-2024-DB-11419-817X799-MEDALLON-IZQUIERDO.png"
  },
  {
    "filename": "MERCEDES-SPRINTER-2008-2024-DD-11396-1396X764-PUERTA-DELANTERA-DERECHA.png",
    "brand": "MERCEDES",
    "model": "SPRINTER",
    "submodels": [
      "SPRINTER"
    ],
    "startYear": 2008,
    "endYear": 2024,
    "windowCode": "DD",
    "windowNumber": "11396",
    "size": {
      "width": 1396,
      "height": 764,
      "raw": "1396X764"
    },
    "description": "PUERTA-DELANTERA-DERECHA",
    "imagePath": "/detail-glass/MERCEDES-SPRINTER-2008-2024-DD-11396-1396X764-PUERTA-DELANTERA-DERECHA.png"
  },
  {
    "filename": "MERCEDES-SPRINTER-2008-2024-DD-11397-1396X764-PUERTA-DELANTERA-DERECHA.png",
    "brand": "MERCEDES",
    "model": "SPRINTER",
    "submodels": [
      "SPRINTER"
    ],
    "startYear": 2008,
    "endYear": 2024,
    "windowCode": "DD",
    "windowNumber": "11397",
    "size": {
      "width": 1396,
      "height": 764,
      "raw": "1396X764"
    },
    "description": "PUERTA-DELANTERA-DERECHA",
    "imagePath": "/detail-glass/MERCEDES-SPRINTER-2008-2024-DD-11397-1396X764-PUERTA-DELANTERA-DERECHA.png"
  },
  {
    "filename": "MERCEDES-SPRINTER-2008-2024-DD-11397-1396X764-PUERTA-DELANTERA-IZQUIERDA-A.png",
    "brand": "MERCEDES",
    "model": "SPRINTER",
    "submodels": [
      "SPRINTER"
    ],
    "startYear": 2008,
    "endYear": 2024,
    "windowCode": "DD",
    "windowNumber": "11397",
    "size": {
      "width": 1396,
      "height": 764,
      "raw": "1396X764"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA-A",
    "imagePath": "/detail-glass/MERCEDES-SPRINTER-2008-2024-DD-11397-1396X764-PUERTA-DELANTERA-IZQUIERDA-A.png"
  },
  {
    "filename": "MERCEDES-SPRINTER-2008-2024-DD-11397-1396X764-PUERTA-DELANTERA-IZQUIERDA-B.png",
    "brand": "MERCEDES",
    "model": "SPRINTER",
    "submodels": [
      "SPRINTER"
    ],
    "startYear": 2008,
    "endYear": 2024,
    "windowCode": "DD",
    "windowNumber": "11397",
    "size": {
      "width": 1396,
      "height": 764,
      "raw": "1396X764"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA-B",
    "imagePath": "/detail-glass/MERCEDES-SPRINTER-2008-2024-DD-11397-1396X764-PUERTA-DELANTERA-IZQUIERDA-B.png"
  },
  {
    "filename": "MERCEDES-SPRINTER-2008-2024-DD-11397-1396X764-PUERTA-DELANTERA-IZQUIERDA.png",
    "brand": "MERCEDES",
    "model": "SPRINTER",
    "submodels": [
      "SPRINTER"
    ],
    "startYear": 2008,
    "endYear": 2024,
    "windowCode": "DD",
    "windowNumber": "11397",
    "size": {
      "width": 1396,
      "height": 764,
      "raw": "1396X764"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA",
    "imagePath": "/detail-glass/MERCEDES-SPRINTER-2008-2024-DD-11397-1396X764-PUERTA-DELANTERA-IZQUIERDA.png"
  },
  {
    "filename": "MERCEDES-SPRINTER-2008-2024-DD-20052-1152X767-PUERTA-DELANTERA-DERECHA.png",
    "brand": "MERCEDES",
    "model": "SPRINTER",
    "submodels": [
      "SPRINTER"
    ],
    "startYear": 2008,
    "endYear": 2024,
    "windowCode": "DD",
    "windowNumber": "20052",
    "size": {
      "width": 1152,
      "height": 767,
      "raw": "1152X767"
    },
    "description": "PUERTA-DELANTERA-DERECHA",
    "imagePath": "/detail-glass/MERCEDES-SPRINTER-2008-2024-DD-20052-1152X767-PUERTA-DELANTERA-DERECHA.png"
  },
  {
    "filename": "MERCEDES-SPRINTER-2008-2024-DD-20053-1152X767-PUERTA-DELANTERA-IZQUIERDA.png",
    "brand": "MERCEDES",
    "model": "SPRINTER",
    "submodels": [
      "SPRINTER"
    ],
    "startYear": 2008,
    "endYear": 2024,
    "windowCode": "DD",
    "windowNumber": "20053",
    "size": {
      "width": 1152,
      "height": 767,
      "raw": "1152X767"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA",
    "imagePath": "/detail-glass/MERCEDES-SPRINTER-2008-2024-DD-20053-1152X767-PUERTA-DELANTERA-IZQUIERDA.png"
  },
  {
    "filename": "MERCEDES-SPRINTER-2008-2024-DQ-11414-1418X706-CENTRAL-DERECHA.png",
    "brand": "MERCEDES",
    "model": "SPRINTER",
    "submodels": [
      "SPRINTER"
    ],
    "startYear": 2008,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "11414",
    "size": {
      "width": 1418,
      "height": 706,
      "raw": "1418X706"
    },
    "description": "CENTRAL-DERECHA",
    "imagePath": "/detail-glass/MERCEDES-SPRINTER-2008-2024-DQ-11414-1418X706-CENTRAL-DERECHA.png"
  },
  {
    "filename": "MERCEDES-SPRINTER-2008-2024-DQ-11414-1418X706-CENTRAL-DERECHO.png",
    "brand": "MERCEDES",
    "model": "SPRINTER",
    "submodels": [
      "SPRINTER"
    ],
    "startYear": 2008,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "11414",
    "size": {
      "width": 1418,
      "height": 706,
      "raw": "1418X706"
    },
    "description": "CENTRAL-DERECHO",
    "imagePath": "/detail-glass/MERCEDES-SPRINTER-2008-2024-DQ-11414-1418X706-CENTRAL-DERECHO.png"
  },
  {
    "filename": "MERCEDES-SPRINTER-2008-2024-DQ-11415-1418X764-CENTRAL-IZQUIERDA.png",
    "brand": "MERCEDES",
    "model": "SPRINTER",
    "submodels": [
      "SPRINTER"
    ],
    "startYear": 2008,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "11415",
    "size": {
      "width": 1418,
      "height": 764,
      "raw": "1418X764"
    },
    "description": "CENTRAL-IZQUIERDA",
    "imagePath": "/detail-glass/MERCEDES-SPRINTER-2008-2024-DQ-11415-1418X764-CENTRAL-IZQUIERDA.png"
  },
  {
    "filename": "MERCEDES-SPRINTER-2008-2024-DQ-11415-1418X764-CENTRAL-IZQUIERDO.png",
    "brand": "MERCEDES",
    "model": "SPRINTER",
    "submodels": [
      "SPRINTER"
    ],
    "startYear": 2008,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "11415",
    "size": {
      "width": 1418,
      "height": 764,
      "raw": "1418X764"
    },
    "description": "CENTRAL-IZQUIERDO",
    "imagePath": "/detail-glass/MERCEDES-SPRINTER-2008-2024-DQ-11415-1418X764-CENTRAL-IZQUIERDO.png"
  },
  {
    "filename": "MERCEDES-SPRINTER-2008-2024-DQ-11416-1269X763-COSTADO-TRASERO-DERECHO-A.png",
    "brand": "MERCEDES",
    "model": "SPRINTER",
    "submodels": [
      "SPRINTER"
    ],
    "startYear": 2008,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "11416",
    "size": {
      "width": 1269,
      "height": 763,
      "raw": "1269X763"
    },
    "description": "COSTADO-TRASERO-DERECHO-A",
    "imagePath": "/detail-glass/MERCEDES-SPRINTER-2008-2024-DQ-11416-1269X763-COSTADO-TRASERO-DERECHO-A.png"
  },
  {
    "filename": "MERCEDES-SPRINTER-2008-2024-DQ-11416-1269X763-COSTADO-TRASERO-DERECHO-B.png",
    "brand": "MERCEDES",
    "model": "SPRINTER",
    "submodels": [
      "SPRINTER"
    ],
    "startYear": 2008,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "11416",
    "size": {
      "width": 1269,
      "height": 763,
      "raw": "1269X763"
    },
    "description": "COSTADO-TRASERO-DERECHO-B",
    "imagePath": "/detail-glass/MERCEDES-SPRINTER-2008-2024-DQ-11416-1269X763-COSTADO-TRASERO-DERECHO-B.png"
  },
  {
    "filename": "MERCEDES-SPRINTER-2008-2024-DQ-11417-1269X763-COSTADO-TRASERO-IZQUIERDO-A.png",
    "brand": "MERCEDES",
    "model": "SPRINTER",
    "submodels": [
      "SPRINTER"
    ],
    "startYear": 2008,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "11417",
    "size": {
      "width": 1269,
      "height": 763,
      "raw": "1269X763"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO-A",
    "imagePath": "/detail-glass/MERCEDES-SPRINTER-2008-2024-DQ-11417-1269X763-COSTADO-TRASERO-IZQUIERDO-A.png"
  },
  {
    "filename": "MERCEDES-SPRINTER-2008-2024-DQ-11417-1269X763-COSTADO-TRASERO-IZQUIERDO-B.png",
    "brand": "MERCEDES",
    "model": "SPRINTER",
    "submodels": [
      "SPRINTER"
    ],
    "startYear": 2008,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "11417",
    "size": {
      "width": 1269,
      "height": 763,
      "raw": "1269X763"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO-B",
    "imagePath": "/detail-glass/MERCEDES-SPRINTER-2008-2024-DQ-11417-1269X763-COSTADO-TRASERO-IZQUIERDO-B.png"
  },
  {
    "filename": "MERCEDES-SPRINTER-2008-2024-DQ-20054-1217X765-COSTADO-TRASERO-DERECHO.png",
    "brand": "MERCEDES",
    "model": "SPRINTER",
    "submodels": [
      "SPRINTER"
    ],
    "startYear": 2008,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "20054",
    "size": {
      "width": 1217,
      "height": 765,
      "raw": "1217X765"
    },
    "description": "COSTADO-TRASERO-DERECHO",
    "imagePath": "/detail-glass/MERCEDES-SPRINTER-2008-2024-DQ-20054-1217X765-COSTADO-TRASERO-DERECHO.png"
  },
  {
    "filename": "MERCEDES-SPRINTER-2008-2024-DQ-20055-1217X765-COSTADO-TRASERO-IZQUIERDO.png",
    "brand": "MERCEDES",
    "model": "SPRINTER",
    "submodels": [
      "SPRINTER"
    ],
    "startYear": 2008,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "20055",
    "size": {
      "width": 1217,
      "height": 765,
      "raw": "1217X765"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO",
    "imagePath": "/detail-glass/MERCEDES-SPRINTER-2008-2024-DQ-20055-1217X765-COSTADO-TRASERO-IZQUIERDO.png"
  },
  {
    "filename": "MERCEDES-SPRINTER-2008-2024-FB-28250-780X775-MEDALLON-DERECHO.png",
    "brand": "MERCEDES",
    "model": "SPRINTER",
    "submodels": [
      "SPRINTER"
    ],
    "startYear": 2008,
    "endYear": 2024,
    "windowCode": "FB",
    "windowNumber": "28250",
    "size": {
      "width": 780,
      "height": 775,
      "raw": "780X775"
    },
    "description": "MEDALLON-DERECHO",
    "imagePath": "/detail-glass/MERCEDES-SPRINTER-2008-2024-FB-28250-780X775-MEDALLON-DERECHO.png"
  },
  {
    "filename": "MERCEDES-SPRINTER-2008-2024-FB-28251-780X775-MEDALLON-IZQUIERDO.png",
    "brand": "MERCEDES",
    "model": "SPRINTER",
    "submodels": [
      "SPRINTER"
    ],
    "startYear": 2008,
    "endYear": 2024,
    "windowCode": "FB",
    "windowNumber": "28251",
    "size": {
      "width": 780,
      "height": 775,
      "raw": "780X775"
    },
    "description": "MEDALLON-IZQUIERDO",
    "imagePath": "/detail-glass/MERCEDES-SPRINTER-2008-2024-FB-28251-780X775-MEDALLON-IZQUIERDO.png"
  },
  {
    "filename": "MERCEDES-SPRINTER-LARGA-2008-2024-DQ-11859-1632X705-COSTADO-TRASERO-DERECHO-LARGA.png",
    "brand": "MERCEDES",
    "model": "SPRINTER-LARGA",
    "submodels": [
      "SPRINTER",
      "LARGA"
    ],
    "startYear": 2008,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "11859",
    "size": {
      "width": 1632,
      "height": 705,
      "raw": "1632X705"
    },
    "description": "COSTADO-TRASERO-DERECHO-LARGA",
    "imagePath": "/detail-glass/MERCEDES-SPRINTER-LARGA-2008-2024-DQ-11859-1632X705-COSTADO-TRASERO-DERECHO-LARGA.png"
  },
  {
    "filename": "MERCEDES-SPRINTER-LARGA-2008-2024-DQ-11860-1632X705-COSTADO-TRASERO-IZQUIERDO-LARGA.png",
    "brand": "MERCEDES",
    "model": "SPRINTER-LARGA",
    "submodels": [
      "SPRINTER",
      "LARGA"
    ],
    "startYear": 2008,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "11860",
    "size": {
      "width": 1632,
      "height": 705,
      "raw": "1632X705"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO-LARGA",
    "imagePath": "/detail-glass/MERCEDES-SPRINTER-LARGA-2008-2024-DQ-11860-1632X705-COSTADO-TRASERO-IZQUIERDO-LARGA.png"
  },
  {
    "filename": "PEUGEOT-MANAGER-L2H2-2016-2020-DB-12565-666X829-MEDALLON-DERECHO.png",
    "brand": "PEUGEOT",
    "model": "MANAGER-L2H2",
    "submodels": [
      "MANAGER",
      "L2H2"
    ],
    "startYear": 2016,
    "endYear": 2020,
    "windowCode": "DB",
    "windowNumber": "12565",
    "size": {
      "width": 666,
      "height": 829,
      "raw": "666X829"
    },
    "description": "MEDALLON-DERECHO",
    "imagePath": "/detail-glass/PEUGEOT-MANAGER-L2H2-2016-2020-DB-12565-666X829-MEDALLON-DERECHO.png"
  },
  {
    "filename": "PEUGEOT-MANAGER-L2H2-2016-2020-DB-12566-666X829-MEDALLON-IZQUIERDO.png",
    "brand": "PEUGEOT",
    "model": "MANAGER-L2H2",
    "submodels": [
      "MANAGER",
      "L2H2"
    ],
    "startYear": 2016,
    "endYear": 2020,
    "windowCode": "DB",
    "windowNumber": "12566",
    "size": {
      "width": 666,
      "height": 829,
      "raw": "666X829"
    },
    "description": "MEDALLON-IZQUIERDO",
    "imagePath": "/detail-glass/PEUGEOT-MANAGER-L2H2-2016-2020-DB-12566-666X829-MEDALLON-IZQUIERDO.png"
  },
  {
    "filename": "PEUGEOT-MANAGER-L2H2-2016-2020-FD-20022-1400X665-PUERTA-DELANTERA-DERECHA.png",
    "brand": "PEUGEOT",
    "model": "MANAGER-L2H2",
    "submodels": [
      "MANAGER",
      "L2H2"
    ],
    "startYear": 2016,
    "endYear": 2020,
    "windowCode": "FD",
    "windowNumber": "20022",
    "size": {
      "width": 1400,
      "height": 665,
      "raw": "1400X665"
    },
    "description": "PUERTA-DELANTERA-DERECHA",
    "imagePath": "/detail-glass/PEUGEOT-MANAGER-L2H2-2016-2020-FD-20022-1400X665-PUERTA-DELANTERA-DERECHA.png"
  },
  {
    "filename": "PEUGEOT-MANAGER-L2H2-2016-2020-FD-20023-1400X665-PUERTA-DELANTERA-IZQUIERDA.png",
    "brand": "PEUGEOT",
    "model": "MANAGER-L2H2",
    "submodels": [
      "MANAGER",
      "L2H2"
    ],
    "startYear": 2016,
    "endYear": 2020,
    "windowCode": "FD",
    "windowNumber": "20023",
    "size": {
      "width": 1400,
      "height": 665,
      "raw": "1400X665"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA",
    "imagePath": "/detail-glass/PEUGEOT-MANAGER-L2H2-2016-2020-FD-20023-1400X665-PUERTA-DELANTERA-IZQUIERDA.png"
  },
  {
    "filename": "PEUGEOT-MANAGER-L2H2-2016-2020-FQ-20064-1543X585-COSTADO-TRASERO-DERECHO.png",
    "brand": "PEUGEOT",
    "model": "MANAGER-L2H2",
    "submodels": [
      "MANAGER",
      "L2H2"
    ],
    "startYear": 2016,
    "endYear": 2020,
    "windowCode": "FQ",
    "windowNumber": "20064",
    "size": {
      "width": 1543,
      "height": 585,
      "raw": "1543X585"
    },
    "description": "COSTADO-TRASERO-DERECHO",
    "imagePath": "/detail-glass/PEUGEOT-MANAGER-L2H2-2016-2020-FQ-20064-1543X585-COSTADO-TRASERO-DERECHO.png"
  },
  {
    "filename": "PEUGEOT-MANAGER-L2H2-2016-2020-FQ-20065-1543X665-COSTADO-IZQUIERDO.png",
    "brand": "PEUGEOT",
    "model": "MANAGER-L2H2",
    "submodels": [
      "MANAGER",
      "L2H2"
    ],
    "startYear": 2016,
    "endYear": 2020,
    "windowCode": "FQ",
    "windowNumber": "20065",
    "size": {
      "width": 1543,
      "height": 665,
      "raw": "1543X665"
    },
    "description": "COSTADO-IZQUIERDO",
    "imagePath": "/detail-glass/PEUGEOT-MANAGER-L2H2-2016-2020-FQ-20065-1543X665-COSTADO-IZQUIERDO.png"
  },
  {
    "filename": "PEUGEOT-MANAGER-L4H2-2016-2020-DB-12565-666X829-MEDALLON-DERECHO.png",
    "brand": "PEUGEOT",
    "model": "MANAGER-L4H2",
    "submodels": [
      "MANAGER",
      "L4H2"
    ],
    "startYear": 2016,
    "endYear": 2020,
    "windowCode": "DB",
    "windowNumber": "12565",
    "size": {
      "width": 666,
      "height": 829,
      "raw": "666X829"
    },
    "description": "MEDALLON-DERECHO",
    "imagePath": "/detail-glass/PEUGEOT-MANAGER-L4H2-2016-2020-DB-12565-666X829-MEDALLON-DERECHO.png"
  },
  {
    "filename": "PEUGEOT-MANAGER-L4H2-2016-2020-DB-1566-666X829-MEDALLON-IZQUIERDO.png",
    "brand": "PEUGEOT",
    "model": "MANAGER-L4H2",
    "submodels": [
      "MANAGER",
      "L4H2"
    ],
    "startYear": 2016,
    "endYear": 2020,
    "windowCode": "DB",
    "windowNumber": "1566",
    "size": {
      "width": 666,
      "height": 829,
      "raw": "666X829"
    },
    "description": "MEDALLON-IZQUIERDO",
    "imagePath": "/detail-glass/PEUGEOT-MANAGER-L4H2-2016-2020-DB-1566-666X829-MEDALLON-IZQUIERDO.png"
  },
  {
    "filename": "PEUGEOT-MANAGER-L4H2-2016-2020-FD-20022-1400X665-PUERTA-DELANTERA-DERECHA-A.png",
    "brand": "PEUGEOT",
    "model": "MANAGER-L4H2",
    "submodels": [
      "MANAGER",
      "L4H2"
    ],
    "startYear": 2016,
    "endYear": 2020,
    "windowCode": "FD",
    "windowNumber": "20022",
    "size": {
      "width": 1400,
      "height": 665,
      "raw": "1400X665"
    },
    "description": "PUERTA-DELANTERA-DERECHA-A",
    "imagePath": "/detail-glass/PEUGEOT-MANAGER-L4H2-2016-2020-FD-20022-1400X665-PUERTA-DELANTERA-DERECHA-A.png"
  },
  {
    "filename": "PEUGEOT-MANAGER-L4H2-2016-2020-FD-20022-1400X665-PUERTA-DELANTERA-DERECHA-B.png",
    "brand": "PEUGEOT",
    "model": "MANAGER-L4H2",
    "submodels": [
      "MANAGER",
      "L4H2"
    ],
    "startYear": 2016,
    "endYear": 2020,
    "windowCode": "FD",
    "windowNumber": "20022",
    "size": {
      "width": 1400,
      "height": 665,
      "raw": "1400X665"
    },
    "description": "PUERTA-DELANTERA-DERECHA-B",
    "imagePath": "/detail-glass/PEUGEOT-MANAGER-L4H2-2016-2020-FD-20022-1400X665-PUERTA-DELANTERA-DERECHA-B.png"
  },
  {
    "filename": "PEUGEOT-MANAGER-L4H2-2016-2020-FD-20023-1400X665-PUERTA-DELANTERA-IZQUIERDA-A.png",
    "brand": "PEUGEOT",
    "model": "MANAGER-L4H2",
    "submodels": [
      "MANAGER",
      "L4H2"
    ],
    "startYear": 2016,
    "endYear": 2020,
    "windowCode": "FD",
    "windowNumber": "20023",
    "size": {
      "width": 1400,
      "height": 665,
      "raw": "1400X665"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA-A",
    "imagePath": "/detail-glass/PEUGEOT-MANAGER-L4H2-2016-2020-FD-20023-1400X665-PUERTA-DELANTERA-IZQUIERDA-A.png"
  },
  {
    "filename": "PEUGEOT-MANAGER-L4H2-2016-2020-FD-20023-1400X665-PUERTA-DELANTERA-IZQUIERDA-B.png",
    "brand": "PEUGEOT",
    "model": "MANAGER-L4H2",
    "submodels": [
      "MANAGER",
      "L4H2"
    ],
    "startYear": 2016,
    "endYear": 2020,
    "windowCode": "FD",
    "windowNumber": "20023",
    "size": {
      "width": 1400,
      "height": 665,
      "raw": "1400X665"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA-B",
    "imagePath": "/detail-glass/PEUGEOT-MANAGER-L4H2-2016-2020-FD-20023-1400X665-PUERTA-DELANTERA-IZQUIERDA-B.png"
  },
  {
    "filename": "PEUGEOT-MANAGER-L4H2-2016-2020-FQ-20024-1350X585-COSTADO-CENTRAL-DERECHO-A.png",
    "brand": "PEUGEOT",
    "model": "MANAGER-L4H2",
    "submodels": [
      "MANAGER",
      "L4H2"
    ],
    "startYear": 2016,
    "endYear": 2020,
    "windowCode": "FQ",
    "windowNumber": "20024",
    "size": {
      "width": 1350,
      "height": 585,
      "raw": "1350X585"
    },
    "description": "COSTADO-CENTRAL-DERECHO-A",
    "imagePath": "/detail-glass/PEUGEOT-MANAGER-L4H2-2016-2020-FQ-20024-1350X585-COSTADO-CENTRAL-DERECHO-A.png"
  },
  {
    "filename": "PEUGEOT-MANAGER-L4H2-2016-2020-FQ-20024-1350X585-COSTADO-CENTRAL-DERECHO-B.png",
    "brand": "PEUGEOT",
    "model": "MANAGER-L4H2",
    "submodels": [
      "MANAGER",
      "L4H2"
    ],
    "startYear": 2016,
    "endYear": 2020,
    "windowCode": "FQ",
    "windowNumber": "20024",
    "size": {
      "width": 1350,
      "height": 585,
      "raw": "1350X585"
    },
    "description": "COSTADO-CENTRAL-DERECHO-B",
    "imagePath": "/detail-glass/PEUGEOT-MANAGER-L4H2-2016-2020-FQ-20024-1350X585-COSTADO-CENTRAL-DERECHO-B.png"
  },
  {
    "filename": "PEUGEOT-MANAGER-L4H2-2016-2020-FQ-20025-1350X665-COSTADO-CENTRAL-IZQUIERDA-A.png",
    "brand": "PEUGEOT",
    "model": "MANAGER-L4H2",
    "submodels": [
      "MANAGER",
      "L4H2"
    ],
    "startYear": 2016,
    "endYear": 2020,
    "windowCode": "FQ",
    "windowNumber": "20025",
    "size": {
      "width": 1350,
      "height": 665,
      "raw": "1350X665"
    },
    "description": "COSTADO-CENTRAL-IZQUIERDA-A",
    "imagePath": "/detail-glass/PEUGEOT-MANAGER-L4H2-2016-2020-FQ-20025-1350X665-COSTADO-CENTRAL-IZQUIERDA-A.png"
  },
  {
    "filename": "PEUGEOT-MANAGER-L4H2-2016-2020-FQ-20025-1350X665-COSTADO-CENTRAL-IZQUIERDA-B.png",
    "brand": "PEUGEOT",
    "model": "MANAGER-L4H2",
    "submodels": [
      "MANAGER",
      "L4H2"
    ],
    "startYear": 2016,
    "endYear": 2020,
    "windowCode": "FQ",
    "windowNumber": "20025",
    "size": {
      "width": 1350,
      "height": 665,
      "raw": "1350X665"
    },
    "description": "COSTADO-CENTRAL-IZQUIERDA-B",
    "imagePath": "/detail-glass/PEUGEOT-MANAGER-L4H2-2016-2020-FQ-20025-1350X665-COSTADO-CENTRAL-IZQUIERDA-B.png"
  },
  {
    "filename": "PEUGEOT-MANAGER-L4H2-2016-2020-FQ-20026-1135X665-COSTADO-TRASERO-DERECHO-A.png",
    "brand": "PEUGEOT",
    "model": "MANAGER-L4H2",
    "submodels": [
      "MANAGER",
      "L4H2"
    ],
    "startYear": 2016,
    "endYear": 2020,
    "windowCode": "FQ",
    "windowNumber": "20026",
    "size": {
      "width": 1135,
      "height": 665,
      "raw": "1135X665"
    },
    "description": "COSTADO-TRASERO-DERECHO-A",
    "imagePath": "/detail-glass/PEUGEOT-MANAGER-L4H2-2016-2020-FQ-20026-1135X665-COSTADO-TRASERO-DERECHO-A.png"
  },
  {
    "filename": "PEUGEOT-MANAGER-L4H2-2016-2020-FQ-20026-1135X665-COSTADO-TRASERO-DERECHO-B.png",
    "brand": "PEUGEOT",
    "model": "MANAGER-L4H2",
    "submodels": [
      "MANAGER",
      "L4H2"
    ],
    "startYear": 2016,
    "endYear": 2020,
    "windowCode": "FQ",
    "windowNumber": "20026",
    "size": {
      "width": 1135,
      "height": 665,
      "raw": "1135X665"
    },
    "description": "COSTADO-TRASERO-DERECHO-B",
    "imagePath": "/detail-glass/PEUGEOT-MANAGER-L4H2-2016-2020-FQ-20026-1135X665-COSTADO-TRASERO-DERECHO-B.png"
  },
  {
    "filename": "PEUGEOT-MANAGER-L4H2-2016-2020-FQ-20027-1135X665-COSTADO-TRASERO-IZQUIERDO-A.png",
    "brand": "PEUGEOT",
    "model": "MANAGER-L4H2",
    "submodels": [
      "MANAGER",
      "L4H2"
    ],
    "startYear": 2016,
    "endYear": 2020,
    "windowCode": "FQ",
    "windowNumber": "20027",
    "size": {
      "width": 1135,
      "height": 665,
      "raw": "1135X665"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO-A",
    "imagePath": "/detail-glass/PEUGEOT-MANAGER-L4H2-2016-2020-FQ-20027-1135X665-COSTADO-TRASERO-IZQUIERDO-A.png"
  },
  {
    "filename": "PEUGEOT-MANAGER-L4H2-2016-2020-FQ-20027-1135X665-COSTADO-TRASERO-IZQUIERDO-B.png",
    "brand": "PEUGEOT",
    "model": "MANAGER-L4H2",
    "submodels": [
      "MANAGER",
      "L4H2"
    ],
    "startYear": 2016,
    "endYear": 2020,
    "windowCode": "FQ",
    "windowNumber": "20027",
    "size": {
      "width": 1135,
      "height": 665,
      "raw": "1135X665"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO-B",
    "imagePath": "/detail-glass/PEUGEOT-MANAGER-L4H2-2016-2020-FQ-20027-1135X665-COSTADO-TRASERO-IZQUIERDO-B.png"
  },
  {
    "filename": "PEUGEOT-PARTNER-2023-2024-DQ-20040-593X489-TRASERA-DERECHA.png",
    "brand": "PEUGEOT",
    "model": "PARTNER",
    "submodels": [
      "PARTNER"
    ],
    "startYear": 2023,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "20040",
    "size": {
      "width": 593,
      "height": 489,
      "raw": "593X489"
    },
    "description": "TRASERA-DERECHA",
    "imagePath": "/detail-glass/PEUGEOT-PARTNER-2023-2024-DQ-20040-593X489-TRASERA-DERECHA.png"
  },
  {
    "filename": "PEUGEOT-PARTNER-2023-2024-DQ-20041-593X489-TRASERA-IZQUIERDA.png",
    "brand": "PEUGEOT",
    "model": "PARTNER",
    "submodels": [
      "PARTNER"
    ],
    "startYear": 2023,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "20041",
    "size": {
      "width": 593,
      "height": 489,
      "raw": "593X489"
    },
    "description": "TRASERA-IZQUIERDA",
    "imagePath": "/detail-glass/PEUGEOT-PARTNER-2023-2024-DQ-20041-593X489-TRASERA-IZQUIERDA.png"
  },
  {
    "filename": "PEUGEOT-PARTNER-2023-2024-FB-20042-554X506-MEDALLON-DERECHO.png",
    "brand": "PEUGEOT",
    "model": "PARTNER",
    "submodels": [
      "PARTNER"
    ],
    "startYear": 2023,
    "endYear": 2024,
    "windowCode": "FB",
    "windowNumber": "20042",
    "size": {
      "width": 554,
      "height": 506,
      "raw": "554X506"
    },
    "description": "MEDALLON-DERECHO",
    "imagePath": "/detail-glass/PEUGEOT-PARTNER-2023-2024-FB-20042-554X506-MEDALLON-DERECHO.png"
  },
  {
    "filename": "PEUGEOT-PARTNER-2023-2024-FB-20043-780X551-MEDALLON-IZQUIERDO.png",
    "brand": "PEUGEOT",
    "model": "PARTNER",
    "submodels": [
      "PARTNER"
    ],
    "startYear": 2023,
    "endYear": 2024,
    "windowCode": "FB",
    "windowNumber": "20043",
    "size": {
      "width": 780,
      "height": 551,
      "raw": "780X551"
    },
    "description": "MEDALLON-IZQUIERDO",
    "imagePath": "/detail-glass/PEUGEOT-PARTNER-2023-2024-FB-20043-780X551-MEDALLON-IZQUIERDO.png"
  },
  {
    "filename": "PEUGEOT-PARTNER-2023-2024-FD-20036-784X500-PUERTA-DELANTERA-DERECHA.png",
    "brand": "PEUGEOT",
    "model": "PARTNER",
    "submodels": [
      "PARTNER"
    ],
    "startYear": 2023,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "20036",
    "size": {
      "width": 784,
      "height": 500,
      "raw": "784X500"
    },
    "description": "PUERTA-DELANTERA-DERECHA",
    "imagePath": "/detail-glass/PEUGEOT-PARTNER-2023-2024-FD-20036-784X500-PUERTA-DELANTERA-DERECHA.png"
  },
  {
    "filename": "PEUGEOT-PARTNER-2023-2024-FD-20037-784X500-PUERTA-DELANTERA-IZQUIERDA.png",
    "brand": "PEUGEOT",
    "model": "PARTNER",
    "submodels": [
      "PARTNER"
    ],
    "startYear": 2023,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "20037",
    "size": {
      "width": 784,
      "height": 500,
      "raw": "784X500"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA",
    "imagePath": "/detail-glass/PEUGEOT-PARTNER-2023-2024-FD-20037-784X500-PUERTA-DELANTERA-IZQUIERDA.png"
  },
  {
    "filename": "PEUGEOT-RIFTER-2022-2024-DQ-20038-830X488-TRASERA-DERECHA.png",
    "brand": "PEUGEOT",
    "model": "RIFTER",
    "submodels": [
      "RIFTER"
    ],
    "startYear": 2022,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "20038",
    "size": {
      "width": 830,
      "height": 488,
      "raw": "830X488"
    },
    "description": "TRASERA-DERECHA",
    "imagePath": "/detail-glass/PEUGEOT-RIFTER-2022-2024-DQ-20038-830X488-TRASERA-DERECHA.png"
  },
  {
    "filename": "PEUGEOT-RIFTER-2022-2024-DQ-20039-830X488-TRASERA-IZQUIERDA.png",
    "brand": "PEUGEOT",
    "model": "RIFTER",
    "submodels": [
      "RIFTER"
    ],
    "startYear": 2022,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "20039",
    "size": {
      "width": 830,
      "height": 488,
      "raw": "830X488"
    },
    "description": "TRASERA-IZQUIERDA",
    "imagePath": "/detail-glass/PEUGEOT-RIFTER-2022-2024-DQ-20039-830X488-TRASERA-IZQUIERDA.png"
  },
  {
    "filename": "PEUGEOT-RIFTER-2022-2024-FB-28409-580X1300-MEDALLON-CON-BARRENO-I-DF.png",
    "brand": "PEUGEOT",
    "model": "RIFTER",
    "submodels": [
      "RIFTER"
    ],
    "startYear": 2022,
    "endYear": 2024,
    "windowCode": "FB",
    "windowNumber": "28409",
    "size": {
      "width": 580,
      "height": 1300,
      "raw": "580X1300"
    },
    "description": "MEDALLON-CON-BARRENO-I-DF",
    "imagePath": "/detail-glass/PEUGEOT-RIFTER-2022-2024-FB-28409-580X1300-MEDALLON-CON-BARRENO-I-DF.png"
  },
  {
    "filename": "PEUGEOT-RIFTER-2022-2024-FD-20036-784X500-PUERTA-DELANTERA-DERECHA.png",
    "brand": "PEUGEOT",
    "model": "RIFTER",
    "submodels": [
      "RIFTER"
    ],
    "startYear": 2022,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "20036",
    "size": {
      "width": 784,
      "height": 500,
      "raw": "784X500"
    },
    "description": "PUERTA-DELANTERA-DERECHA",
    "imagePath": "/detail-glass/PEUGEOT-RIFTER-2022-2024-FD-20036-784X500-PUERTA-DELANTERA-DERECHA.png"
  },
  {
    "filename": "PEUGEOT-RIFTER-2022-2024-FD-20037-784X500-PUERTA-DELANTERA-IZQUIERDA.png",
    "brand": "PEUGEOT",
    "model": "RIFTER",
    "submodels": [
      "RIFTER"
    ],
    "startYear": 2022,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "20037",
    "size": {
      "width": 784,
      "height": 500,
      "raw": "784X500"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA",
    "imagePath": "/detail-glass/PEUGEOT-RIFTER-2022-2024-FD-20037-784X500-PUERTA-DELANTERA-IZQUIERDA.png"
  },
  {
    "filename": "RAM-PROMASTER-2019-2024-DB-12565-666X829-MEDALLON-IZQUIERDO.png",
    "brand": "RAM",
    "model": "PROMASTER",
    "submodels": [
      "PROMASTER"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "DB",
    "windowNumber": "12565",
    "size": {
      "width": 666,
      "height": 829,
      "raw": "666X829"
    },
    "description": "MEDALLON-IZQUIERDO",
    "imagePath": "/detail-glass/RAM-PROMASTER-2019-2024-DB-12565-666X829-MEDALLON-IZQUIERDO.png"
  },
  {
    "filename": "RAM-PROMASTER-2019-2024-DB-12566-666X829-MEDALLON-DERECHO.png",
    "brand": "RAM",
    "model": "PROMASTER",
    "submodels": [
      "PROMASTER"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "DB",
    "windowNumber": "12566",
    "size": {
      "width": 666,
      "height": 829,
      "raw": "666X829"
    },
    "description": "MEDALLON-DERECHO",
    "imagePath": "/detail-glass/RAM-PROMASTER-2019-2024-DB-12566-666X829-MEDALLON-DERECHO.png"
  },
  {
    "filename": "RAM-PROMASTER-2019-2024-FD-20022-1400X665-PUERTA-DELANTERA-DERECHA.png",
    "brand": "RAM",
    "model": "PROMASTER",
    "submodels": [
      "PROMASTER"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "20022",
    "size": {
      "width": 1400,
      "height": 665,
      "raw": "1400X665"
    },
    "description": "PUERTA-DELANTERA-DERECHA",
    "imagePath": "/detail-glass/RAM-PROMASTER-2019-2024-FD-20022-1400X665-PUERTA-DELANTERA-DERECHA.png"
  },
  {
    "filename": "RAM-PROMASTER1500-2019-2024-DB-12565-660X829-MEDALLON-DERECHO.png",
    "brand": "RAM",
    "model": "PROMASTER1500",
    "submodels": [
      "PROMASTER1500"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "DB",
    "windowNumber": "12565",
    "size": {
      "width": 660,
      "height": 829,
      "raw": "660X829"
    },
    "description": "MEDALLON-DERECHO",
    "imagePath": "/detail-glass/RAM-PROMASTER1500-2019-2024-DB-12565-660X829-MEDALLON-DERECHO.png"
  },
  {
    "filename": "RAM-PROMASTER1500-2019-2024-DB-12566-660X829-MEDALLON-IZQUIERDO.png",
    "brand": "RAM",
    "model": "PROMASTER1500",
    "submodels": [
      "PROMASTER1500"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "DB",
    "windowNumber": "12566",
    "size": {
      "width": 660,
      "height": 829,
      "raw": "660X829"
    },
    "description": "MEDALLON-IZQUIERDO",
    "imagePath": "/detail-glass/RAM-PROMASTER1500-2019-2024-DB-12566-660X829-MEDALLON-IZQUIERDO.png"
  },
  {
    "filename": "RAM-PROMASTER1500-2019-2024-FD-20060-1230X665-PUERTA-DELANTERA-DERECHA.png",
    "brand": "RAM",
    "model": "PROMASTER1500",
    "submodels": [
      "PROMASTER1500"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "20060",
    "size": {
      "width": 1230,
      "height": 665,
      "raw": "1230X665"
    },
    "description": "PUERTA-DELANTERA-DERECHA",
    "imagePath": "/detail-glass/RAM-PROMASTER1500-2019-2024-FD-20060-1230X665-PUERTA-DELANTERA-DERECHA.png"
  },
  {
    "filename": "RAM-PROMASTER1500-2019-2024-FD-20061-1267X665-PUERTA-DELANTERA-IZQUIERDA.png",
    "brand": "RAM",
    "model": "PROMASTER1500",
    "submodels": [
      "PROMASTER1500"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "20061",
    "size": {
      "width": 1267,
      "height": 665,
      "raw": "1267X665"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA",
    "imagePath": "/detail-glass/RAM-PROMASTER1500-2019-2024-FD-20061-1267X665-PUERTA-DELANTERA-IZQUIERDA.png"
  },
  {
    "filename": "RAM-PROMASTER1500-2019-2024-FQ-20062-1260X580-COSTADO-TRASERO-DERECHO.png",
    "brand": "RAM",
    "model": "PROMASTER1500",
    "submodels": [
      "PROMASTER1500"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "20062",
    "size": {
      "width": 1260,
      "height": 580,
      "raw": "1260X580"
    },
    "description": "COSTADO-TRASERO-DERECHO",
    "imagePath": "/detail-glass/RAM-PROMASTER1500-2019-2024-FQ-20062-1260X580-COSTADO-TRASERO-DERECHO.png"
  },
  {
    "filename": "RAM-PROMASTER1500-2019-2024-FQ-20063-1260X665-COSTADO-TRASERO-IZQUIERDO.png",
    "brand": "RAM",
    "model": "PROMASTER1500",
    "submodels": [
      "PROMASTER1500"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "20063",
    "size": {
      "width": 1260,
      "height": 665,
      "raw": "1260X665"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO",
    "imagePath": "/detail-glass/RAM-PROMASTER1500-2019-2024-FQ-20063-1260X665-COSTADO-TRASERO-IZQUIERDO.png"
  },
  {
    "filename": "RAM-PROMASTER2500-2019-2024-DB-12565-6606X829-MEDALLON-DERECHO.png",
    "brand": "RAM",
    "model": "PROMASTER2500",
    "submodels": [
      "PROMASTER2500"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "DB",
    "windowNumber": "12565",
    "size": {
      "width": 6606,
      "height": 829,
      "raw": "6606X829"
    },
    "description": "MEDALLON-DERECHO",
    "imagePath": "/detail-glass/RAM-PROMASTER2500-2019-2024-DB-12565-6606X829-MEDALLON-DERECHO.png"
  },
  {
    "filename": "RAM-PROMASTER2500-2019-2024-DB-12566-6606X829-MEDALLON-IZQUIERDO.png",
    "brand": "RAM",
    "model": "PROMASTER2500",
    "submodels": [
      "PROMASTER2500"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "DB",
    "windowNumber": "12566",
    "size": {
      "width": 6606,
      "height": 829,
      "raw": "6606X829"
    },
    "description": "MEDALLON-IZQUIERDO",
    "imagePath": "/detail-glass/RAM-PROMASTER2500-2019-2024-DB-12566-6606X829-MEDALLON-IZQUIERDO.png"
  },
  {
    "filename": "RAM-PROMASTER2500-2019-2024-FD-20022-1400X665-PUERTA-DELANTERA-DERECHA.png",
    "brand": "RAM",
    "model": "PROMASTER2500",
    "submodels": [
      "PROMASTER2500"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "20022",
    "size": {
      "width": 1400,
      "height": 665,
      "raw": "1400X665"
    },
    "description": "PUERTA-DELANTERA-DERECHA",
    "imagePath": "/detail-glass/RAM-PROMASTER2500-2019-2024-FD-20022-1400X665-PUERTA-DELANTERA-DERECHA.png"
  },
  {
    "filename": "RAM-PROMASTER2500-2019-2024-FD-20023-1400X665-PUERTA-DELANTERA-IZQUIERDA.png",
    "brand": "RAM",
    "model": "PROMASTER2500",
    "submodels": [
      "PROMASTER2500"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "20023",
    "size": {
      "width": 1400,
      "height": 665,
      "raw": "1400X665"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA",
    "imagePath": "/detail-glass/RAM-PROMASTER2500-2019-2024-FD-20023-1400X665-PUERTA-DELANTERA-IZQUIERDA.png"
  },
  {
    "filename": "RAM-PROMASTER2500-2019-2024-FQ-20064-1543X585-COSTADO-TRASERO-DERECHO.png",
    "brand": "RAM",
    "model": "PROMASTER2500",
    "submodels": [
      "PROMASTER2500"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "20064",
    "size": {
      "width": 1543,
      "height": 585,
      "raw": "1543X585"
    },
    "description": "COSTADO-TRASERO-DERECHO",
    "imagePath": "/detail-glass/RAM-PROMASTER2500-2019-2024-FQ-20064-1543X585-COSTADO-TRASERO-DERECHO.png"
  },
  {
    "filename": "RAM-PROMASTER2500-2019-2024-FQ-20065-1543X665-COSTADO-TRASERO-IZQUIERDO.png",
    "brand": "RAM",
    "model": "PROMASTER2500",
    "submodels": [
      "PROMASTER2500"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "20065",
    "size": {
      "width": 1543,
      "height": 665,
      "raw": "1543X665"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO",
    "imagePath": "/detail-glass/RAM-PROMASTER2500-2019-2024-FQ-20065-1543X665-COSTADO-TRASERO-IZQUIERDO.png"
  },
  {
    "filename": "RAM-PROMASTER3500-2019-2024-DB-12565-666X829-MEDALLON-DERECHO.png",
    "brand": "RAM",
    "model": "PROMASTER3500",
    "submodels": [
      "PROMASTER3500"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "DB",
    "windowNumber": "12565",
    "size": {
      "width": 666,
      "height": 829,
      "raw": "666X829"
    },
    "description": "MEDALLON-DERECHO",
    "imagePath": "/detail-glass/RAM-PROMASTER3500-2019-2024-DB-12565-666X829-MEDALLON-DERECHO.png"
  },
  {
    "filename": "RAM-PROMASTER3500-2019-2024-DB-12566-666X829-MEDALLON-IZQUIERDO.png",
    "brand": "RAM",
    "model": "PROMASTER3500",
    "submodels": [
      "PROMASTER3500"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "DB",
    "windowNumber": "12566",
    "size": {
      "width": 666,
      "height": 829,
      "raw": "666X829"
    },
    "description": "MEDALLON-IZQUIERDO",
    "imagePath": "/detail-glass/RAM-PROMASTER3500-2019-2024-DB-12566-666X829-MEDALLON-IZQUIERDO.png"
  },
  {
    "filename": "RAM-PROMASTER3500-2019-2024-FD-20022-1400X665-PUERTA-DELANTERA-DERECHA-A.png",
    "brand": "RAM",
    "model": "PROMASTER3500",
    "submodels": [
      "PROMASTER3500"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "20022",
    "size": {
      "width": 1400,
      "height": 665,
      "raw": "1400X665"
    },
    "description": "PUERTA-DELANTERA-DERECHA-A",
    "imagePath": "/detail-glass/RAM-PROMASTER3500-2019-2024-FD-20022-1400X665-PUERTA-DELANTERA-DERECHA-A.png"
  },
  {
    "filename": "RAM-PROMASTER3500-2019-2024-FD-20022-1400X665-PUERTA-DELANTERA-DERECHA-B.png",
    "brand": "RAM",
    "model": "PROMASTER3500",
    "submodels": [
      "PROMASTER3500"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "20022",
    "size": {
      "width": 1400,
      "height": 665,
      "raw": "1400X665"
    },
    "description": "PUERTA-DELANTERA-DERECHA-B",
    "imagePath": "/detail-glass/RAM-PROMASTER3500-2019-2024-FD-20022-1400X665-PUERTA-DELANTERA-DERECHA-B.png"
  },
  {
    "filename": "RAM-PROMASTER3500-2019-2024-FD-20023-1400X665-PUERTA-DELANTERA-IZQUIERDA-A.png",
    "brand": "RAM",
    "model": "PROMASTER3500",
    "submodels": [
      "PROMASTER3500"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "20023",
    "size": {
      "width": 1400,
      "height": 665,
      "raw": "1400X665"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA-A",
    "imagePath": "/detail-glass/RAM-PROMASTER3500-2019-2024-FD-20023-1400X665-PUERTA-DELANTERA-IZQUIERDA-A.png"
  },
  {
    "filename": "RAM-PROMASTER3500-2019-2024-FD-20023-1400X665-PUERTA-DELANTERA-IZQUIERDA-B.png",
    "brand": "RAM",
    "model": "PROMASTER3500",
    "submodels": [
      "PROMASTER3500"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "20023",
    "size": {
      "width": 1400,
      "height": 665,
      "raw": "1400X665"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA-B",
    "imagePath": "/detail-glass/RAM-PROMASTER3500-2019-2024-FD-20023-1400X665-PUERTA-DELANTERA-IZQUIERDA-B.png"
  },
  {
    "filename": "RAM-PROMASTER3500-2019-2024-FQ-20024-1350X585-COSTADO-CENTRAL-DERECHO-A.png",
    "brand": "RAM",
    "model": "PROMASTER3500",
    "submodels": [
      "PROMASTER3500"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "20024",
    "size": {
      "width": 1350,
      "height": 585,
      "raw": "1350X585"
    },
    "description": "COSTADO-CENTRAL-DERECHO-A",
    "imagePath": "/detail-glass/RAM-PROMASTER3500-2019-2024-FQ-20024-1350X585-COSTADO-CENTRAL-DERECHO-A.png"
  },
  {
    "filename": "RAM-PROMASTER3500-2019-2024-FQ-20024-1350X585-COSTADO-CENTRAL-DERECHO-B.png",
    "brand": "RAM",
    "model": "PROMASTER3500",
    "submodels": [
      "PROMASTER3500"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "20024",
    "size": {
      "width": 1350,
      "height": 585,
      "raw": "1350X585"
    },
    "description": "COSTADO-CENTRAL-DERECHO-B",
    "imagePath": "/detail-glass/RAM-PROMASTER3500-2019-2024-FQ-20024-1350X585-COSTADO-CENTRAL-DERECHO-B.png"
  },
  {
    "filename": "RAM-PROMASTER3500-2019-2024-FQ-20025-1350X665-COSTADO-CENTRAL-IZQUIERDA-A.png",
    "brand": "RAM",
    "model": "PROMASTER3500",
    "submodels": [
      "PROMASTER3500"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "20025",
    "size": {
      "width": 1350,
      "height": 665,
      "raw": "1350X665"
    },
    "description": "COSTADO-CENTRAL-IZQUIERDA-A",
    "imagePath": "/detail-glass/RAM-PROMASTER3500-2019-2024-FQ-20025-1350X665-COSTADO-CENTRAL-IZQUIERDA-A.png"
  },
  {
    "filename": "RAM-PROMASTER3500-2019-2024-FQ-20025-1350X665-COSTADO-CENTRAL-IZQUIERDA-B.png",
    "brand": "RAM",
    "model": "PROMASTER3500",
    "submodels": [
      "PROMASTER3500"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "20025",
    "size": {
      "width": 1350,
      "height": 665,
      "raw": "1350X665"
    },
    "description": "COSTADO-CENTRAL-IZQUIERDA-B",
    "imagePath": "/detail-glass/RAM-PROMASTER3500-2019-2024-FQ-20025-1350X665-COSTADO-CENTRAL-IZQUIERDA-B.png"
  },
  {
    "filename": "RAM-PROMASTER3500-2019-2024-FQ-20026-1135X665-COSTADO-TRASERO-DERECHO-A.png",
    "brand": "RAM",
    "model": "PROMASTER3500",
    "submodels": [
      "PROMASTER3500"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "20026",
    "size": {
      "width": 1135,
      "height": 665,
      "raw": "1135X665"
    },
    "description": "COSTADO-TRASERO-DERECHO-A",
    "imagePath": "/detail-glass/RAM-PROMASTER3500-2019-2024-FQ-20026-1135X665-COSTADO-TRASERO-DERECHO-A.png"
  },
  {
    "filename": "RAM-PROMASTER3500-2019-2024-FQ-20026-1135X665-COSTADO-TRASERO-DERECHO-B.png",
    "brand": "RAM",
    "model": "PROMASTER3500",
    "submodels": [
      "PROMASTER3500"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "20026",
    "size": {
      "width": 1135,
      "height": 665,
      "raw": "1135X665"
    },
    "description": "COSTADO-TRASERO-DERECHO-B",
    "imagePath": "/detail-glass/RAM-PROMASTER3500-2019-2024-FQ-20026-1135X665-COSTADO-TRASERO-DERECHO-B.png"
  },
  {
    "filename": "RAM-PROMASTER3500-2019-2024-FQ-20027-1135X665-COSTADO-TRASERO-IZQUIERDO-A.png",
    "brand": "RAM",
    "model": "PROMASTER3500",
    "submodels": [
      "PROMASTER3500"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "20027",
    "size": {
      "width": 1135,
      "height": 665,
      "raw": "1135X665"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO-A",
    "imagePath": "/detail-glass/RAM-PROMASTER3500-2019-2024-FQ-20027-1135X665-COSTADO-TRASERO-IZQUIERDO-A.png"
  },
  {
    "filename": "RAM-PROMASTER3500-2019-2024-FQ-20027-1135X665-COSTADO-TRASERO-IZQUIERDO-B.png",
    "brand": "RAM",
    "model": "PROMASTER3500",
    "submodels": [
      "PROMASTER3500"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "20027",
    "size": {
      "width": 1135,
      "height": 665,
      "raw": "1135X665"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO-B",
    "imagePath": "/detail-glass/RAM-PROMASTER3500-2019-2024-FQ-20027-1135X665-COSTADO-TRASERO-IZQUIERDO-B.png"
  },
  {
    "filename": "RENAULT-KANGOO-2023-2024-FB-20075-790X476-MEDALLON-IZQUIERDO.png",
    "brand": "RENAULT",
    "model": "KANGOO",
    "submodels": [
      "KANGOO"
    ],
    "startYear": 2023,
    "endYear": 2024,
    "windowCode": "FB",
    "windowNumber": "20075",
    "size": {
      "width": 790,
      "height": 476,
      "raw": "790X476"
    },
    "description": "MEDALLON-IZQUIERDO",
    "imagePath": "/detail-glass/RENAULT-KANGOO-2023-2024-FB-20075-790X476-MEDALLON-IZQUIERDO.png"
  },
  {
    "filename": "RENAULT-KANGOO-2023-2024-FD-20074-528X476-MEDALLON-DERECHO.png",
    "brand": "RENAULT",
    "model": "KANGOO",
    "submodels": [
      "KANGOO"
    ],
    "startYear": 2023,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "20074",
    "size": {
      "width": 528,
      "height": 476,
      "raw": "528X476"
    },
    "description": "MEDALLON-DERECHO",
    "imagePath": "/detail-glass/RENAULT-KANGOO-2023-2024-FD-20074-528X476-MEDALLON-DERECHO.png"
  },
  {
    "filename": "RENAULT-KANGOO-2023-2024-FD-20076-860X517-PUERTA-DELANTERA-DERECHA.png",
    "brand": "RENAULT",
    "model": "KANGOO",
    "submodels": [
      "KANGOO"
    ],
    "startYear": 2023,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "20076",
    "size": {
      "width": 860,
      "height": 517,
      "raw": "860X517"
    },
    "description": "PUERTA-DELANTERA-DERECHA",
    "imagePath": "/detail-glass/RENAULT-KANGOO-2023-2024-FD-20076-860X517-PUERTA-DELANTERA-DERECHA.png"
  },
  {
    "filename": "RENAULT-KANGOO-2023-2024-FD-20077-860X517-PUERTA-DELANTERA-IZQUIERDA.png",
    "brand": "RENAULT",
    "model": "KANGOO",
    "submodels": [
      "KANGOO"
    ],
    "startYear": 2023,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "20077",
    "size": {
      "width": 860,
      "height": 517,
      "raw": "860X517"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA",
    "imagePath": "/detail-glass/RENAULT-KANGOO-2023-2024-FD-20077-860X517-PUERTA-DELANTERA-IZQUIERDA.png"
  },
  {
    "filename": "RENAULT-KANGOO-2023-2024-FQ-20078-480X630-COSTADO-TRASERO-DERECHO.png",
    "brand": "RENAULT",
    "model": "KANGOO",
    "submodels": [
      "KANGOO"
    ],
    "startYear": 2023,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "20078",
    "size": {
      "width": 480,
      "height": 630,
      "raw": "480X630"
    },
    "description": "COSTADO-TRASERO-DERECHO",
    "imagePath": "/detail-glass/RENAULT-KANGOO-2023-2024-FQ-20078-480X630-COSTADO-TRASERO-DERECHO.png"
  },
  {
    "filename": "RENAULT-KANGOO-2023-2024-FQ-20079-480X630-COSTADO-TRASERO-IZQUIERDO.png",
    "brand": "RENAULT",
    "model": "KANGOO",
    "submodels": [
      "KANGOO"
    ],
    "startYear": 2023,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "20079",
    "size": {
      "width": 480,
      "height": 630,
      "raw": "480X630"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO",
    "imagePath": "/detail-glass/RENAULT-KANGOO-2023-2024-FQ-20079-480X630-COSTADO-TRASERO-IZQUIERDO.png"
  },
  {
    "filename": "TOYOTA-HIACE-2011-2019-FD-27096-1311X564-PUERTA-DELANTERA-IZQUIERDA-TIPO-ORIGINAL.png",
    "brand": "TOYOTA",
    "model": "HIACE",
    "submodels": [
      "HIACE"
    ],
    "startYear": 2011,
    "endYear": 2019,
    "windowCode": "FD",
    "windowNumber": "27096",
    "size": {
      "width": 1311,
      "height": 564,
      "raw": "1311X564"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA-TIPO-ORIGINAL",
    "imagePath": "/detail-glass/TOYOTA-HIACE-2011-2019-FD-27096-1311X564-PUERTA-DELANTERA-IZQUIERDA-TIPO-ORIGINAL.png"
  },
  {
    "filename": "TOYOTA-HIACE-2011-2019-FD-27096-1311X564-PUERTA-TRASERA-IZQUIERDA.png",
    "brand": "TOYOTA",
    "model": "HIACE",
    "submodels": [
      "HIACE"
    ],
    "startYear": 2011,
    "endYear": 2019,
    "windowCode": "FD",
    "windowNumber": "27096",
    "size": {
      "width": 1311,
      "height": 564,
      "raw": "1311X564"
    },
    "description": "PUERTA-TRASERA-IZQUIERDA",
    "imagePath": "/detail-glass/TOYOTA-HIACE-2011-2019-FD-27096-1311X564-PUERTA-TRASERA-IZQUIERDA.png"
  },
  {
    "filename": "TOYOTA-HIACE-2011-2019-FD-27101-1370X565-COSTADO-TRASERO-DERECHO-TIPO-ORIGINAL.png",
    "brand": "TOYOTA",
    "model": "HIACE",
    "submodels": [
      "HIACE"
    ],
    "startYear": 2011,
    "endYear": 2019,
    "windowCode": "FD",
    "windowNumber": "27101",
    "size": {
      "width": 1370,
      "height": 565,
      "raw": "1370X565"
    },
    "description": "COSTADO-TRASERO-DERECHO-TIPO-ORIGINAL",
    "imagePath": "/detail-glass/TOYOTA-HIACE-2011-2019-FD-27101-1370X565-COSTADO-TRASERO-DERECHO-TIPO-ORIGINAL.png"
  },
  {
    "filename": "TOYOTA-HIACE-2011-2019-FD-27101-1370X565-COSTADO-TRASERO-DERECHO.png",
    "brand": "TOYOTA",
    "model": "HIACE",
    "submodels": [
      "HIACE"
    ],
    "startYear": 2011,
    "endYear": 2019,
    "windowCode": "FD",
    "windowNumber": "27101",
    "size": {
      "width": 1370,
      "height": 565,
      "raw": "1370X565"
    },
    "description": "COSTADO-TRASERO-DERECHO",
    "imagePath": "/detail-glass/TOYOTA-HIACE-2011-2019-FD-27101-1370X565-COSTADO-TRASERO-DERECHO.png"
  },
  {
    "filename": "TOYOTA-HIACE-2011-2019-FD-50025-565X536-COSTADO-CENTRAL-DERECHO-TIPO-ORIGINAL.png",
    "brand": "TOYOTA",
    "model": "HIACE",
    "submodels": [
      "HIACE"
    ],
    "startYear": 2011,
    "endYear": 2019,
    "windowCode": "FD",
    "windowNumber": "50025",
    "size": {
      "width": 565,
      "height": 536,
      "raw": "565X536"
    },
    "description": "COSTADO-CENTRAL-DERECHO-TIPO-ORIGINAL",
    "imagePath": "/detail-glass/TOYOTA-HIACE-2011-2019-FD-50025-565X536-COSTADO-CENTRAL-DERECHO-TIPO-ORIGINAL.png"
  },
  {
    "filename": "TOYOTA-HIACE-2011-2019-FD-50025-565X536-COSTADO-CENTRAL-DERECHO.png",
    "brand": "TOYOTA",
    "model": "HIACE",
    "submodels": [
      "HIACE"
    ],
    "startYear": 2011,
    "endYear": 2019,
    "windowCode": "FD",
    "windowNumber": "50025",
    "size": {
      "width": 565,
      "height": 536,
      "raw": "565X536"
    },
    "description": "COSTADO-CENTRAL-DERECHO",
    "imagePath": "/detail-glass/TOYOTA-HIACE-2011-2019-FD-50025-565X536-COSTADO-CENTRAL-DERECHO.png"
  },
  {
    "filename": "TOYOTA-HIACE-2011-2019-FD-50025-565X536-COSTADO-CENTRAL-IZQUIERDO-TIPO-ORIGINAL.png",
    "brand": "TOYOTA",
    "model": "HIACE",
    "submodels": [
      "HIACE"
    ],
    "startYear": 2011,
    "endYear": 2019,
    "windowCode": "FD",
    "windowNumber": "50025",
    "size": {
      "width": 565,
      "height": 536,
      "raw": "565X536"
    },
    "description": "COSTADO-CENTRAL-IZQUIERDO-TIPO-ORIGINAL",
    "imagePath": "/detail-glass/TOYOTA-HIACE-2011-2019-FD-50025-565X536-COSTADO-CENTRAL-IZQUIERDO-TIPO-ORIGINAL.png"
  },
  {
    "filename": "TOYOTA-HIACE-2011-2019-FD-50025-565X536-COSTADO-CENTRAL-IZQUIERDO.png",
    "brand": "TOYOTA",
    "model": "HIACE",
    "submodels": [
      "HIACE"
    ],
    "startYear": 2011,
    "endYear": 2019,
    "windowCode": "FD",
    "windowNumber": "50025",
    "size": {
      "width": 565,
      "height": 536,
      "raw": "565X536"
    },
    "description": "COSTADO-CENTRAL-IZQUIERDO",
    "imagePath": "/detail-glass/TOYOTA-HIACE-2011-2019-FD-50025-565X536-COSTADO-CENTRAL-IZQUIERDO.png"
  },
  {
    "filename": "TOYOTA-HIACE-2011-2019-FQ-27095-1311X564-PUERTA-DELANTERA-DERECHA-TIPO-ORIGINAL.png",
    "brand": "TOYOTA",
    "model": "HIACE",
    "submodels": [
      "HIACE"
    ],
    "startYear": 2011,
    "endYear": 2019,
    "windowCode": "FQ",
    "windowNumber": "27095",
    "size": {
      "width": 1311,
      "height": 564,
      "raw": "1311X564"
    },
    "description": "PUERTA-DELANTERA-DERECHA-TIPO-ORIGINAL",
    "imagePath": "/detail-glass/TOYOTA-HIACE-2011-2019-FQ-27095-1311X564-PUERTA-DELANTERA-DERECHA-TIPO-ORIGINAL.png"
  },
  {
    "filename": "TOYOTA-HIACE-2011-2019-FQ-27095-1311X564-PUERTA-DELANTERA-DERECHA.png",
    "brand": "TOYOTA",
    "model": "HIACE",
    "submodels": [
      "HIACE"
    ],
    "startYear": 2011,
    "endYear": 2019,
    "windowCode": "FQ",
    "windowNumber": "27095",
    "size": {
      "width": 1311,
      "height": 564,
      "raw": "1311X564"
    },
    "description": "PUERTA-DELANTERA-DERECHA",
    "imagePath": "/detail-glass/TOYOTA-HIACE-2011-2019-FQ-27095-1311X564-PUERTA-DELANTERA-DERECHA.png"
  },
  {
    "filename": "TOYOTA-HIACE-2011-2019-FQ-27102-1370X565-COSTADO-TRASERO-IZQUIERDO-TIPO-ORIGINAL.png",
    "brand": "TOYOTA",
    "model": "HIACE",
    "submodels": [
      "HIACE"
    ],
    "startYear": 2011,
    "endYear": 2019,
    "windowCode": "FQ",
    "windowNumber": "27102",
    "size": {
      "width": 1370,
      "height": 565,
      "raw": "1370X565"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO-TIPO-ORIGINAL",
    "imagePath": "/detail-glass/TOYOTA-HIACE-2011-2019-FQ-27102-1370X565-COSTADO-TRASERO-IZQUIERDO-TIPO-ORIGINAL.png"
  },
  {
    "filename": "TOYOTA-HIACE-2011-2019-FQ-27102-1370X565-COSTADO-TRASERO-IZQUIERDO.png",
    "brand": "TOYOTA",
    "model": "HIACE",
    "submodels": [
      "HIACE"
    ],
    "startYear": 2011,
    "endYear": 2019,
    "windowCode": "FQ",
    "windowNumber": "27102",
    "size": {
      "width": 1370,
      "height": 565,
      "raw": "1370X565"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO",
    "imagePath": "/detail-glass/TOYOTA-HIACE-2011-2019-FQ-27102-1370X565-COSTADO-TRASERO-IZQUIERDO.png"
  },
  {
    "filename": "VW-CADDYVAN-2015-2019-DQ-20021-1048X543-COSTADO-TRASERO-IZQUIERDO.png",
    "brand": "VW",
    "model": "CADDYVAN",
    "submodels": [
      "CADDYVAN"
    ],
    "startYear": 2015,
    "endYear": 2019,
    "windowCode": "DQ",
    "windowNumber": "20021",
    "size": {
      "width": 1048,
      "height": 543,
      "raw": "1048X543"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO",
    "imagePath": "/detail-glass/VW-CADDYVAN-2015-2019-DQ-20021-1048X543-COSTADO-TRASERO-IZQUIERDO.png"
  },
  {
    "filename": "VW-CADDYVAN-2015-2019-FB-27624-591X506-MEDALLON-DERECHO.png",
    "brand": "VW",
    "model": "CADDYVAN",
    "submodels": [
      "CADDYVAN"
    ],
    "startYear": 2015,
    "endYear": 2019,
    "windowCode": "FB",
    "windowNumber": "27624",
    "size": {
      "width": 591,
      "height": 506,
      "raw": "591X506"
    },
    "description": "MEDALLON-DERECHO",
    "imagePath": "/detail-glass/VW-CADDYVAN-2015-2019-FB-27624-591X506-MEDALLON-DERECHO.png"
  },
  {
    "filename": "VW-CADDYVAN-2015-2019-FB-27625-756X597-MEDALLON-IZQUIERDO.png",
    "brand": "VW",
    "model": "CADDYVAN",
    "submodels": [
      "CADDYVAN"
    ],
    "startYear": 2015,
    "endYear": 2019,
    "windowCode": "FB",
    "windowNumber": "27625",
    "size": {
      "width": 756,
      "height": 597,
      "raw": "756X597"
    },
    "description": "MEDALLON-IZQUIERDO",
    "imagePath": "/detail-glass/VW-CADDYVAN-2015-2019-FB-27625-756X597-MEDALLON-IZQUIERDO.png"
  },
  {
    "filename": "VW-CADDYVAN-2015-2019-FD-20018-705X547-PUERTA-DELANTERA-DERECHA.png",
    "brand": "VW",
    "model": "CADDYVAN",
    "submodels": [
      "CADDYVAN"
    ],
    "startYear": 2015,
    "endYear": 2019,
    "windowCode": "FD",
    "windowNumber": "20018",
    "size": {
      "width": 705,
      "height": 547,
      "raw": "705X547"
    },
    "description": "PUERTA-DELANTERA-DERECHA",
    "imagePath": "/detail-glass/VW-CADDYVAN-2015-2019-FD-20018-705X547-PUERTA-DELANTERA-DERECHA.png"
  },
  {
    "filename": "VW-CADDYVAN-2015-2019-FD-20019-705X547-PUERTA-DELANTERA-IZQUIERDA.png",
    "brand": "VW",
    "model": "CADDYVAN",
    "submodels": [
      "CADDYVAN"
    ],
    "startYear": 2015,
    "endYear": 2019,
    "windowCode": "FD",
    "windowNumber": "20019",
    "size": {
      "width": 705,
      "height": 547,
      "raw": "705X547"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA",
    "imagePath": "/detail-glass/VW-CADDYVAN-2015-2019-FD-20019-705X547-PUERTA-DELANTERA-IZQUIERDA.png"
  },
  {
    "filename": "VW-CADDYVAN-2015-2019-FQ-20020-1048X543-COSTADO-TRASERO-DERECHO.png",
    "brand": "VW",
    "model": "CADDYVAN",
    "submodels": [
      "CADDYVAN"
    ],
    "startYear": 2015,
    "endYear": 2019,
    "windowCode": "FQ",
    "windowNumber": "20020",
    "size": {
      "width": 1048,
      "height": 543,
      "raw": "1048X543"
    },
    "description": "COSTADO-TRASERO-DERECHO",
    "imagePath": "/detail-glass/VW-CADDYVAN-2015-2019-FQ-20020-1048X543-COSTADO-TRASERO-DERECHO.png"
  },
  {
    "filename": "VW-CRAFTER5-2011-2018-DB-11418-817X799-MEDALLON-DERECHO.png",
    "brand": "VW",
    "model": "CRAFTER5",
    "submodels": [
      "CRAFTER5"
    ],
    "startYear": 2011,
    "endYear": 2018,
    "windowCode": "DB",
    "windowNumber": "11418",
    "size": {
      "width": 817,
      "height": 799,
      "raw": "817X799"
    },
    "description": "MEDALLON-DERECHO",
    "imagePath": "/detail-glass/VW-CRAFTER5-2011-2018-DB-11418-817X799-MEDALLON-DERECHO.png"
  },
  {
    "filename": "VW-CRAFTER5-2011-2018-DB-11419-817X799-MEDALLON-IZQUIERDO.png",
    "brand": "VW",
    "model": "CRAFTER5",
    "submodels": [
      "CRAFTER5"
    ],
    "startYear": 2011,
    "endYear": 2018,
    "windowCode": "DB",
    "windowNumber": "11419",
    "size": {
      "width": 817,
      "height": 799,
      "raw": "817X799"
    },
    "description": "MEDALLON-IZQUIERDO",
    "imagePath": "/detail-glass/VW-CRAFTER5-2011-2018-DB-11419-817X799-MEDALLON-IZQUIERDO.png"
  },
  {
    "filename": "VW-CRAFTER5-2011-2018-DD-11396-1396X764-PUERTA-DELANTERA-DERECHA-A.png",
    "brand": "VW",
    "model": "CRAFTER5",
    "submodels": [
      "CRAFTER5"
    ],
    "startYear": 2011,
    "endYear": 2018,
    "windowCode": "DD",
    "windowNumber": "11396",
    "size": {
      "width": 1396,
      "height": 764,
      "raw": "1396X764"
    },
    "description": "PUERTA-DELANTERA-DERECHA-A",
    "imagePath": "/detail-glass/VW-CRAFTER5-2011-2018-DD-11396-1396X764-PUERTA-DELANTERA-DERECHA-A.png"
  },
  {
    "filename": "VW-CRAFTER5-2011-2018-DD-11396-1396X764-PUERTA-DELANTERA-DERECHA-B.png",
    "brand": "VW",
    "model": "CRAFTER5",
    "submodels": [
      "CRAFTER5"
    ],
    "startYear": 2011,
    "endYear": 2018,
    "windowCode": "DD",
    "windowNumber": "11396",
    "size": {
      "width": 1396,
      "height": 764,
      "raw": "1396X764"
    },
    "description": "PUERTA-DELANTERA-DERECHA-B",
    "imagePath": "/detail-glass/VW-CRAFTER5-2011-2018-DD-11396-1396X764-PUERTA-DELANTERA-DERECHA-B.png"
  },
  {
    "filename": "VW-CRAFTER5-2011-2018-DD-11397-1396X764-PUERTA-DELANTERA-IZQUIERDA-A.png",
    "brand": "VW",
    "model": "CRAFTER5",
    "submodels": [
      "CRAFTER5"
    ],
    "startYear": 2011,
    "endYear": 2018,
    "windowCode": "DD",
    "windowNumber": "11397",
    "size": {
      "width": 1396,
      "height": 764,
      "raw": "1396X764"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA-A",
    "imagePath": "/detail-glass/VW-CRAFTER5-2011-2018-DD-11397-1396X764-PUERTA-DELANTERA-IZQUIERDA-A.png"
  },
  {
    "filename": "VW-CRAFTER5-2011-2018-DD-11397-1396X764-PUERTA-DELANTERA-IZQUIERDA-B.png",
    "brand": "VW",
    "model": "CRAFTER5",
    "submodels": [
      "CRAFTER5"
    ],
    "startYear": 2011,
    "endYear": 2018,
    "windowCode": "DD",
    "windowNumber": "11397",
    "size": {
      "width": 1396,
      "height": 764,
      "raw": "1396X764"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA-B",
    "imagePath": "/detail-glass/VW-CRAFTER5-2011-2018-DD-11397-1396X764-PUERTA-DELANTERA-IZQUIERDA-B.png"
  },
  {
    "filename": "VW-CRAFTER5-2011-2018-DQ-11414-1418X706-COSTADO-CENTRAL-DERECHA-B.png",
    "brand": "VW",
    "model": "CRAFTER5",
    "submodels": [
      "CRAFTER5"
    ],
    "startYear": 2011,
    "endYear": 2018,
    "windowCode": "DQ",
    "windowNumber": "11414",
    "size": {
      "width": 1418,
      "height": 706,
      "raw": "1418X706"
    },
    "description": "COSTADO-CENTRAL-DERECHA-B",
    "imagePath": "/detail-glass/VW-CRAFTER5-2011-2018-DQ-11414-1418X706-COSTADO-CENTRAL-DERECHA-B.png"
  },
  {
    "filename": "VW-CRAFTER5-2011-2018-DQ-11415-1418X764-COSTADO-CENTRAL-IZQUIERDA-A.png",
    "brand": "VW",
    "model": "CRAFTER5",
    "submodels": [
      "CRAFTER5"
    ],
    "startYear": 2011,
    "endYear": 2018,
    "windowCode": "DQ",
    "windowNumber": "11415",
    "size": {
      "width": 1418,
      "height": 764,
      "raw": "1418X764"
    },
    "description": "COSTADO-CENTRAL-IZQUIERDA-A",
    "imagePath": "/detail-glass/VW-CRAFTER5-2011-2018-DQ-11415-1418X764-COSTADO-CENTRAL-IZQUIERDA-A.png"
  },
  {
    "filename": "VW-CRAFTER5-2011-2018-DQ-11415-1418X764-COSTADO-CENTRAL-IZQUIERDA-B.png",
    "brand": "VW",
    "model": "CRAFTER5",
    "submodels": [
      "CRAFTER5"
    ],
    "startYear": 2011,
    "endYear": 2018,
    "windowCode": "DQ",
    "windowNumber": "11415",
    "size": {
      "width": 1418,
      "height": 764,
      "raw": "1418X764"
    },
    "description": "COSTADO-CENTRAL-IZQUIERDA-B",
    "imagePath": "/detail-glass/VW-CRAFTER5-2011-2018-DQ-11415-1418X764-COSTADO-CENTRAL-IZQUIERDA-B.png"
  },
  {
    "filename": "VW-CRAFTER5-2011-2018-DQ-11416-1269X763-COSTADO-TRASERO-DERECHO-A.png",
    "brand": "VW",
    "model": "CRAFTER5",
    "submodels": [
      "CRAFTER5"
    ],
    "startYear": 2011,
    "endYear": 2018,
    "windowCode": "DQ",
    "windowNumber": "11416",
    "size": {
      "width": 1269,
      "height": 763,
      "raw": "1269X763"
    },
    "description": "COSTADO-TRASERO-DERECHO-A",
    "imagePath": "/detail-glass/VW-CRAFTER5-2011-2018-DQ-11416-1269X763-COSTADO-TRASERO-DERECHO-A.png"
  },
  {
    "filename": "VW-CRAFTER5-2011-2018-DQ-11416-1269X763-COSTADO-TRASERO-DERECHO-B.png",
    "brand": "VW",
    "model": "CRAFTER5",
    "submodels": [
      "CRAFTER5"
    ],
    "startYear": 2011,
    "endYear": 2018,
    "windowCode": "DQ",
    "windowNumber": "11416",
    "size": {
      "width": 1269,
      "height": 763,
      "raw": "1269X763"
    },
    "description": "COSTADO-TRASERO-DERECHO-B",
    "imagePath": "/detail-glass/VW-CRAFTER5-2011-2018-DQ-11416-1269X763-COSTADO-TRASERO-DERECHO-B.png"
  },
  {
    "filename": "VW-CRAFTER5-2011-2018-DQ-11417-169X763-COSTADO-TRASERO-IZQUIERDO-A.png",
    "brand": "VW",
    "model": "CRAFTER5",
    "submodels": [
      "CRAFTER5"
    ],
    "startYear": 2011,
    "endYear": 2018,
    "windowCode": "DQ",
    "windowNumber": "11417",
    "size": {
      "width": 169,
      "height": 763,
      "raw": "169X763"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO-A",
    "imagePath": "/detail-glass/VW-CRAFTER5-2011-2018-DQ-11417-169X763-COSTADO-TRASERO-IZQUIERDO-A.png"
  },
  {
    "filename": "VW-CRAFTER5-2011-2018-DQ-11417-169X763-COSTADO-TRASERO-IZQUIERDO-B.png",
    "brand": "VW",
    "model": "CRAFTER5",
    "submodels": [
      "CRAFTER5"
    ],
    "startYear": 2011,
    "endYear": 2018,
    "windowCode": "DQ",
    "windowNumber": "11417",
    "size": {
      "width": 169,
      "height": 763,
      "raw": "169X763"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO-B",
    "imagePath": "/detail-glass/VW-CRAFTER5-2011-2018-DQ-11417-169X763-COSTADO-TRASERO-IZQUIERDO-B.png"
  },
  {
    "filename": "VW-CRAFTER5-2011-2018-DQ-1414-1418X706-COSTADO-CENTRAL-DERECHA-A.png",
    "brand": "VW",
    "model": "CRAFTER5",
    "submodels": [
      "CRAFTER5"
    ],
    "startYear": 2011,
    "endYear": 2018,
    "windowCode": "DQ",
    "windowNumber": "1414",
    "size": {
      "width": 1418,
      "height": 706,
      "raw": "1418X706"
    },
    "description": "COSTADO-CENTRAL-DERECHA-A",
    "imagePath": "/detail-glass/VW-CRAFTER5-2011-2018-DQ-1414-1418X706-COSTADO-CENTRAL-DERECHA-A.png"
  },
  {
    "filename": "VW-CRAFTER5-2019-2024-DQ-20014-1456X639-COSTADO-CENTRAL-DERECHO-A.png",
    "brand": "VW",
    "model": "CRAFTER5",
    "submodels": [
      "CRAFTER5"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "20014",
    "size": {
      "width": 1456,
      "height": 639,
      "raw": "1456X639"
    },
    "description": "COSTADO-CENTRAL-DERECHO-A",
    "imagePath": "/detail-glass/VW-CRAFTER5-2019-2024-DQ-20014-1456X639-COSTADO-CENTRAL-DERECHO-A.png"
  },
  {
    "filename": "VW-CRAFTER5-2019-2024-DQ-20014-1456X639-COSTADO-CENTRAL-DERECHO-B.png",
    "brand": "VW",
    "model": "CRAFTER5",
    "submodels": [
      "CRAFTER5"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "20014",
    "size": {
      "width": 1456,
      "height": 639,
      "raw": "1456X639"
    },
    "description": "COSTADO-CENTRAL-DERECHO-B",
    "imagePath": "/detail-glass/VW-CRAFTER5-2019-2024-DQ-20014-1456X639-COSTADO-CENTRAL-DERECHO-B.png"
  },
  {
    "filename": "VW-CRAFTER5-2019-2024-DQ-20015-1454X705-COSTADO-CENTRAL-IZQUIERDA-A.png",
    "brand": "VW",
    "model": "CRAFTER5",
    "submodels": [
      "CRAFTER5"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "20015",
    "size": {
      "width": 1454,
      "height": 705,
      "raw": "1454X705"
    },
    "description": "COSTADO-CENTRAL-IZQUIERDA-A",
    "imagePath": "/detail-glass/VW-CRAFTER5-2019-2024-DQ-20015-1454X705-COSTADO-CENTRAL-IZQUIERDA-A.png"
  },
  {
    "filename": "VW-CRAFTER5-2019-2024-DQ-20015-1454X705-COSTADO-CENTRAL-IZQUIERDA-B.png",
    "brand": "VW",
    "model": "CRAFTER5",
    "submodels": [
      "CRAFTER5"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "DQ",
    "windowNumber": "20015",
    "size": {
      "width": 1454,
      "height": 705,
      "raw": "1454X705"
    },
    "description": "COSTADO-CENTRAL-IZQUIERDA-B",
    "imagePath": "/detail-glass/VW-CRAFTER5-2019-2024-DQ-20015-1454X705-COSTADO-CENTRAL-IZQUIERDA-B.png"
  },
  {
    "filename": "VW-CRAFTER5-2019-2024-FB-20262-660X882-MEDALLON-DERECHO.png",
    "brand": "VW",
    "model": "CRAFTER5",
    "submodels": [
      "CRAFTER5"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "FB",
    "windowNumber": "20262",
    "size": {
      "width": 660,
      "height": 882,
      "raw": "660X882"
    },
    "description": "MEDALLON-DERECHO",
    "imagePath": "/detail-glass/VW-CRAFTER5-2019-2024-FB-20262-660X882-MEDALLON-DERECHO.png"
  },
  {
    "filename": "VW-CRAFTER5-2019-2024-FB-20263-660X882-MEDALLON-IZQUIERDO.png",
    "brand": "VW",
    "model": "CRAFTER5",
    "submodels": [
      "CRAFTER5"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "FB",
    "windowNumber": "20263",
    "size": {
      "width": 660,
      "height": 882,
      "raw": "660X882"
    },
    "description": "MEDALLON-IZQUIERDO",
    "imagePath": "/detail-glass/VW-CRAFTER5-2019-2024-FB-20263-660X882-MEDALLON-IZQUIERDO.png"
  },
  {
    "filename": "VW-CRAFTER5-2019-2024-FD-20012-1487X710-PUERTA-DELANTERA-DERECHA-A.png",
    "brand": "VW",
    "model": "CRAFTER5",
    "submodels": [
      "CRAFTER5"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "20012",
    "size": {
      "width": 1487,
      "height": 710,
      "raw": "1487X710"
    },
    "description": "PUERTA-DELANTERA-DERECHA-A",
    "imagePath": "/detail-glass/VW-CRAFTER5-2019-2024-FD-20012-1487X710-PUERTA-DELANTERA-DERECHA-A.png"
  },
  {
    "filename": "VW-CRAFTER5-2019-2024-FD-20012-1487X710-PUERTA-DELANTERA-DERECHA-B.png",
    "brand": "VW",
    "model": "CRAFTER5",
    "submodels": [
      "CRAFTER5"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "20012",
    "size": {
      "width": 1487,
      "height": 710,
      "raw": "1487X710"
    },
    "description": "PUERTA-DELANTERA-DERECHA-B",
    "imagePath": "/detail-glass/VW-CRAFTER5-2019-2024-FD-20012-1487X710-PUERTA-DELANTERA-DERECHA-B.png"
  },
  {
    "filename": "VW-CRAFTER5-2019-2024-FD-20013-1487X710-PUERTA-DELANTERA-IZQUIERDA-A.png",
    "brand": "VW",
    "model": "CRAFTER5",
    "submodels": [
      "CRAFTER5"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "20013",
    "size": {
      "width": 1487,
      "height": 710,
      "raw": "1487X710"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA-A",
    "imagePath": "/detail-glass/VW-CRAFTER5-2019-2024-FD-20013-1487X710-PUERTA-DELANTERA-IZQUIERDA-A.png"
  },
  {
    "filename": "VW-CRAFTER5-2019-2024-FD-20013-1487X710-PUERTA-DELANTERA-IZQUIERDA-B.png",
    "brand": "VW",
    "model": "CRAFTER5",
    "submodels": [
      "CRAFTER5"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "FD",
    "windowNumber": "20013",
    "size": {
      "width": 1487,
      "height": 710,
      "raw": "1487X710"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA-B",
    "imagePath": "/detail-glass/VW-CRAFTER5-2019-2024-FD-20013-1487X710-PUERTA-DELANTERA-IZQUIERDA-B.png"
  },
  {
    "filename": "VW-CRAFTER5-2019-2024-FQ-20016-885X683-COSTADO-TRASERO-DERECHO-A.png",
    "brand": "VW",
    "model": "CRAFTER5",
    "submodels": [
      "CRAFTER5"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "20016",
    "size": {
      "width": 885,
      "height": 683,
      "raw": "885X683"
    },
    "description": "COSTADO-TRASERO-DERECHO-A",
    "imagePath": "/detail-glass/VW-CRAFTER5-2019-2024-FQ-20016-885X683-COSTADO-TRASERO-DERECHO-A.png"
  },
  {
    "filename": "VW-CRAFTER5-2019-2024-FQ-20016-885X683-COSTADO-TRASERO-DERECHO-B.png",
    "brand": "VW",
    "model": "CRAFTER5",
    "submodels": [
      "CRAFTER5"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "20016",
    "size": {
      "width": 885,
      "height": 683,
      "raw": "885X683"
    },
    "description": "COSTADO-TRASERO-DERECHO-B",
    "imagePath": "/detail-glass/VW-CRAFTER5-2019-2024-FQ-20016-885X683-COSTADO-TRASERO-DERECHO-B.png"
  },
  {
    "filename": "VW-CRAFTER5-2019-2024-FQ-20017-885X683-COSTADO-TRASERO-IZQUIERDO-A.png",
    "brand": "VW",
    "model": "CRAFTER5",
    "submodels": [
      "CRAFTER5"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "20017",
    "size": {
      "width": 885,
      "height": 683,
      "raw": "885X683"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO-A",
    "imagePath": "/detail-glass/VW-CRAFTER5-2019-2024-FQ-20017-885X683-COSTADO-TRASERO-IZQUIERDO-A.png"
  },
  {
    "filename": "VW-CRAFTER5-2019-2024-FQ-20017-885X683-COSTADO-TRASERO-IZQUIERDO-B.png",
    "brand": "VW",
    "model": "CRAFTER5",
    "submodels": [
      "CRAFTER5"
    ],
    "startYear": 2019,
    "endYear": 2024,
    "windowCode": "FQ",
    "windowNumber": "20017",
    "size": {
      "width": 885,
      "height": 683,
      "raw": "885X683"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO-B",
    "imagePath": "/detail-glass/VW-CRAFTER5-2019-2024-FQ-20017-885X683-COSTADO-TRASERO-IZQUIERDO-B.png"
  },
  {
    "filename": "VW-EUROVANDIESEL-2010-2018-FB-24877-1537X560-MEDALLON.png",
    "brand": "VW",
    "model": "EUROVANDIESEL",
    "submodels": [
      "EUROVANDIESEL"
    ],
    "startYear": 2010,
    "endYear": 2018,
    "windowCode": "FB",
    "windowNumber": "24877",
    "size": {
      "width": 1537,
      "height": 560,
      "raw": "1537X560"
    },
    "description": "MEDALLON",
    "imagePath": "/detail-glass/VW-EUROVANDIESEL-2010-2018-FB-24877-1537X560-MEDALLON.png"
  },
  {
    "filename": "VW-EUROVANDIESEL-2010-2018-FB-24879-725X577-MEDALLON-IZQUIERDO.png",
    "brand": "VW",
    "model": "EUROVANDIESEL",
    "submodels": [
      "EUROVANDIESEL"
    ],
    "startYear": 2010,
    "endYear": 2018,
    "windowCode": "FB",
    "windowNumber": "24879",
    "size": {
      "width": 725,
      "height": 577,
      "raw": "725X577"
    },
    "description": "MEDALLON-IZQUIERDO",
    "imagePath": "/detail-glass/VW-EUROVANDIESEL-2010-2018-FB-24879-725X577-MEDALLON-IZQUIERDO.png"
  },
  {
    "filename": "VW-EUROVANDIESEL-2010-2018-FB-24880-725X577-MEDALLON-DERECHO.png",
    "brand": "VW",
    "model": "EUROVANDIESEL",
    "submodels": [
      "EUROVANDIESEL"
    ],
    "startYear": 2010,
    "endYear": 2018,
    "windowCode": "FB",
    "windowNumber": "24880",
    "size": {
      "width": 725,
      "height": 577,
      "raw": "725X577"
    },
    "description": "MEDALLON-DERECHO",
    "imagePath": "/detail-glass/VW-EUROVANDIESEL-2010-2018-FB-24880-725X577-MEDALLON-DERECHO.png"
  },
  {
    "filename": "VW-EUROVANDIESEL-2010-2018-FD-05038-1122X580-PUERTA-DELANTERA-DERECHA.png",
    "brand": "VW",
    "model": "EUROVANDIESEL",
    "submodels": [
      "EUROVANDIESEL"
    ],
    "startYear": 2010,
    "endYear": 2018,
    "windowCode": "FD",
    "windowNumber": "05038",
    "size": {
      "width": 1122,
      "height": 580,
      "raw": "1122X580"
    },
    "description": "PUERTA-DELANTERA-DERECHA",
    "imagePath": "/detail-glass/VW-EUROVANDIESEL-2010-2018-FD-05038-1122X580-PUERTA-DELANTERA-DERECHA.png"
  },
  {
    "filename": "VW-EUROVANDIESEL-2010-2018-FD-05043-1122X580-PUERTA-DELANTERA-IZQUIERDA.png",
    "brand": "VW",
    "model": "EUROVANDIESEL",
    "submodels": [
      "EUROVANDIESEL"
    ],
    "startYear": 2010,
    "endYear": 2018,
    "windowCode": "FD",
    "windowNumber": "05043",
    "size": {
      "width": 1122,
      "height": 580,
      "raw": "1122X580"
    },
    "description": "PUERTA-DELANTERA-IZQUIERDA",
    "imagePath": "/detail-glass/VW-EUROVANDIESEL-2010-2018-FD-05043-1122X580-PUERTA-DELANTERA-IZQUIERDA.png"
  },
  {
    "filename": "VW-EUROVANDIESEL-2010-2018-FD-24875-161X571-COSTADO-TRASERO-DERECHO.png",
    "brand": "VW",
    "model": "EUROVANDIESEL",
    "submodels": [
      "EUROVANDIESEL"
    ],
    "startYear": 2010,
    "endYear": 2018,
    "windowCode": "FD",
    "windowNumber": "24875",
    "size": {
      "width": 161,
      "height": 571,
      "raw": "161X571"
    },
    "description": "COSTADO-TRASERO-DERECHO",
    "imagePath": "/detail-glass/VW-EUROVANDIESEL-2010-2018-FD-24875-161X571-COSTADO-TRASERO-DERECHO.png"
  },
  {
    "filename": "VW-EUROVANDIESEL-2010-2018-FQ-24876-1261X571-COSTADO-TRASERO-IZQUIERDO.png",
    "brand": "VW",
    "model": "EUROVANDIESEL",
    "submodels": [
      "EUROVANDIESEL"
    ],
    "startYear": 2010,
    "endYear": 2018,
    "windowCode": "FQ",
    "windowNumber": "24876",
    "size": {
      "width": 1261,
      "height": 571,
      "raw": "1261X571"
    },
    "description": "COSTADO-TRASERO-IZQUIERDO",
    "imagePath": "/detail-glass/VW-EUROVANDIESEL-2010-2018-FQ-24876-1261X571-COSTADO-TRASERO-IZQUIERDO.png"
  }
];

// Helper function to get all unique brands
export function getUniqueBrands(): string[] {
  return Array.from(new Set(vehicleWindowImages.map(img => img.brand))).sort();
}

// Helper function to get all unique models
export function getUniqueModels(): string[] {
  return Array.from(new Set(vehicleWindowImages.map(img => img.model))).sort();
}

// Helper function to filter images by brand
export function getImagesByBrand(brand: string): VehicleWindowImage[] {
  return vehicleWindowImages.filter(img => img.brand === brand);
}

// Helper function to filter images by model
export function getImagesByModel(model: string): VehicleWindowImage[] {
  return vehicleWindowImages.filter(img => img.model === model);
}

// Helper function to filter images by year range
export function getImagesByYearRange(startYear: number, endYear: number): VehicleWindowImage[] {
  return vehicleWindowImages.filter(img =>
    img.startYear <= endYear && img.endYear >= startYear
  );
}

// Helper function to search images by description
export function searchByDescription(searchTerm: string): VehicleWindowImage[] {
  const term = searchTerm.toLowerCase();
  return vehicleWindowImages.filter(img =>
    img.description.toLowerCase().includes(term)
  );
}
