import fs from "fs/promises";
import path from "path";

const getFilePath = (type) => path.join(process.cwd(), `db/${type}.json`);

export const dataController = async (req, res) => {
  try {
    const { type } = req.params; 
    const newData = req.body;

    const filePath = getFilePath(type);

    await fs.mkdir(path.dirname(filePath), { recursive: true });

    let data = [];

    try {
      const existingData = await fs.readFile(filePath, "utf-8");
      data = JSON.parse(existingData);
    } catch (error) {
      console.log(`${type}.json does not exist or is empty. Creating a new one.`);
    }

    if (!Array.isArray(data)) {
      data = [];
    }

    data.push(newData);

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

    res.status(200).json({
      success: true,
      message: `${type} data stored successfully`,
      data, 
    });
  } catch (error) {
    console.error("Error in storing data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to store data",
      error: error.message,
    });
  }
};
