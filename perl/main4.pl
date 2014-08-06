use strict;
use warnings;

use Data::Dumper;

use Parser;
use Visualizer;

my $parser = Parser->new( filename => '../sample_data/log.ltsv' );
my $visualizer = Visualizer->new($parser->parse);

$visualizer->print_errors_rate_by_reqtime;
