'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
ApplicationConfiguration.registerModule('core.admin', ['core']);
ApplicationConfiguration.registerModule('core.admin.routes', ['ui.router']);

/**




console.log('#   __    __                            __     __                                            __       __\n#  /  |  /  |                          /  |   /  |                                          /  \     /  |\n#  $$ |  $$ | ______  __    __        _$$ |_  $$ |____   ______   ______   ______           $$  \   /$$ | ______   ______   ______   ______   ______\n#  $$ |__$$ |/      \\/  |  /  |      / $$   | $$      \\ /      \\ /      \\ /      \\          $$$  \\ /$$$ |/      \\ /      \\ /      \\ /      \\ /      \\\n#  $$    $$ /$$$$$$  $$ |  $$ |      $$$$$$/  $$$$$$$  /$$$$$$  /$$$$$$  /$$$$$$  |         $$$$  /$$$$ |$$$$$$  /$$$$$$  /$$$$$$  /$$$$$$  /$$$$$$  |\n#  $$$$$$$$ $$    $$ $$ |  $$ |        $$ | __$$ |  $$ $$    $$ $$ |  $$/$$    $$ |         $$ $$ $$/$$ |/    $$ $$ |  $$ $$ |  $$ $$    $$ $$ |  $$/\n#  $$ |  $$ $$$$$$$$/$$ \__$$ |        $$ |/  $$ |  $$ $$$$$$$$/$$ |     $$$$$$$$/ __       $$ |$$$/ $$ /$$$$$$$ $$ |__$$ $$ |__$$ $$$$$$$$/$$ |__\n#  $$ |  $$ $$       $$    $$ |        $$  $$/$$ |  $$ $$       $$ |     $$       /  |      $$ | $/  $$ $$    $$ $$    $$/$$    $$/$$       $$ /  |\n#  $$/   $$/ $$$$$$$/ $$$$$$$ |         $$$$/ $$/   $$/ $$$$$$$/$$/       $$$$$$$/$$/       $$/      $$/ $$$$$$$/$$$$$$$/ $$$$$$$/  $$$$$$$/$$/$$/\n#                    /  \__$$ |                                                   $/                             $$ |     $$ |\n#                    $$    $$/                                                                                   $$ |     $$ |\n#                     $$$$$$/                                                                                    $$/      $$/');




**/