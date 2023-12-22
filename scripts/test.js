const { expect } = require("chai");
const { ethers } = require("ethers");

describe("Upload Contract", function () {
  let upload;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    const Upload = await ethers.getContractFactory("Upload");
    upload = await Upload.deploy();
    await upload.deployed();
  });

  it("Should add a URL and allow access", async function () {
    // Add a URL
    await upload.add("0x8166f546bab6da521a8369cab06c5d2b9e46670292d85c875ee9ec20e84ffb61", "https://example.com");

    // Allow access to another address
    await upload.allow("0xc526ee95bf44d8fc405a158bb884d9d1238d99f0612e9f33d006bb0789009aaa");

    // Display URLs
    const displayResult = await upload.display("0x8166f546bab6da521a8369cab06c5d2b9e46670292d85c875ee9ec20e84ffb61");

    // Check if the URL is added and accessible
    expect(displayResult[0]).to.equal("https://example.com");

    // Get the access list
    const accessList = await upload.shareAccess();

    // Check if access is allowed for the specified address
    const allowedAccess = accessList[0].access;
    expect(allowedAccess).to.equal(true);
  });

  it("Should disallow access", async function () {
    // Disallow access for another address
    await upload.disallow("0x47c99abed3324a2707c28affff1267e45918ec8c3f20b8aa892e8b065d2942dd");

    // Get the access list
    const accessList = await upload.shareAccess();

    // Check if access is disallowed for the specified address
    const allowedAccess = accessList[0].access;
    expect(allowedAccess).to.equal(false);
  });
});


